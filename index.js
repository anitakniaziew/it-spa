require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();


app.use(
  cors({
    origin: 'http://localhost:9000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

const mapId = ({ _id, ...rest }) => ({
  id: _id,
  ...rest,
});

const prefixPhoto = (path) =>
  `https://it-spa.s3.eu-central-1.amazonaws.com/${path}`;

const mapRoomPhotos = ({ coverPhoto, photos, ...rest }) => ({
  coverPhoto: prefixPhoto(`rooms/${coverPhoto}`),
  photos: photos.map((photo) => prefixPhoto(`rooms/${photo}`)),
  ...rest,
});

const mapTreatmentPhotos = ({ coverPhoto, ...rest }) => ({
  coverPhoto: prefixPhoto(`treatments/${coverPhoto}`),
  ...rest,
});

const parseToObjectId = (id) => {
  try {
    return ObjectId(id);
  } catch {
    return null;
  }
};

client.connect().then((client) => {
  const db = client.db();

  const enrichItems = (items) => Promise.all(
    items.map( async (item) => {
      if (item.itemType === 'roomCartItem') {
        const roomId = parseToObjectId(item.id);
        const room = await db.collection('rooms').findOne({ _id: roomId });
        let parsedRoom = mapId(room);
        parsedRoom = mapRoomPhotos(room);
        return {
          ...item,
          roomDetails: parsedRoom,
        };
      } else {
        const treatmentId = parseToObjectId(item.id);
        const treatment = await db
          .collection('treatments')
          .findOne({ _id: treatmentId });
        let parsedTreatment = mapId(treatment);
        parsedTreatment = mapTreatmentPhotos(treatment);
        return {
          ...item,
          treatmentDetails: parsedTreatment,
        }
      }
    })
  );

  app.post('/users', async (req, res) => {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await db.collection('users').findOne({ email });
    if (user) {
      res.status(400).end();
      return;
    }
    await db.collection('users').insertOne({
      email,
      password: hash,
    });
    res.status(201).end();
  });

  app.get('/user', async (req, res) => {
    if (req.session.userId) {
      res.end()
    } else {
      res.status(401).end();
    }
  })

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });

    if (user) {
      const hash = user.password;
      const passwordsMatch = await bcrypt.compare(password, hash);

      if (passwordsMatch) {
        // eslint-disable-next-line no-underscore-dangle
        req.session.userId = user._id;
        res.status(201).end();
        return;
      }
    }
    res.status(403).end();
  });

  app.get('/logout', async (req, res) => {
    req.session.destroy(() => res.end());
  });

  app.get('/rooms', async (req, res) => {
    const rooms = await db.collection('rooms').find().toArray();
    const parsedRooms = rooms.map(mapId).map(mapRoomPhotos);
    res.send(parsedRooms).end();
  });

  app.get('/rooms/:id', async (req, res) => {
    const roomId = parseToObjectId(req.params.id);
    const room = await db.collection('rooms').findOne({ _id: roomId });
    if (room) {
      let parsedRoom = mapId(room);
      parsedRoom = mapRoomPhotos(room);
      res.send(parsedRoom).end();
      return;
    }
    res.status(400).end();
  });

  app.get('/treatments', async (req, res) => {
    const treatments = await db.collection('treatments').find().toArray();
    const parsedTreatments = treatments.map(mapId).map(mapTreatmentPhotos);
    res.send(parsedTreatments).end();
  });

  app.get('/treatments/:id', async (req, res) => {
    const treatmentId = parseToObjectId(req.params.id);
    const treatment = await db
      .collection('treatments')
      .findOne({ _id: treatmentId });
    if (treatment) {
      let parsedTreatment = mapId(treatment);
      parsedTreatment = mapTreatmentPhotos(treatment);
      res.send(parsedTreatment).end();
      return;
    }
    res.status(400).end();
  });

  app.get('/cart', async (req, res) => {
    const currentCart = req.session.cart || [];
    const cartDetailed = await enrichItems(currentCart);

    res.send(cartDetailed).end();
  });

  app.post('/cart', async (req, res) => {
    const currentCart = req.session.cart || [];

    if (req.body.itemType === 'roomCartItem') {
      const { id, itemType, reservationFrom, reservationTo } = req.body;
      const newCartItem = {
        id,
        itemType,
        reservationFrom,
        reservationTo,
      };

      const isItemInCart = currentCart.some(
        ({ id, itemType }) =>
          id === newCartItem.id && itemType === newCartItem.itemType,
      );
      if (isItemInCart) {
        res.send(400).end();
        return;
      }

      req.session.cart = [...currentCart, newCartItem];
      res.send(201).end();
    } else if (req.body.itemType === 'treatmentCartItem') {
      const { id, itemType, quantity } = req.body;
      const newCartItem = {
        id,
        itemType,
        quantity,
      };

      const isItemInCart = currentCart.some(
        ({ id }) => id === newCartItem.id && itemType === newCartItem.itemType,
      );

      if (isItemInCart) {
        const indexToChange = req.session.cart.findIndex( item => item.id === id);

        req.session.cart[indexToChange].quantity = currentCart[indexToChange].quantity + newCartItem.quantity;
        res.status(201).end();
        return;
      }

      req.session.cart = [...currentCart, newCartItem];
      res.status(201).end();
    } else {
      res.status(400).end();
    }
  });

  app.delete('/cart/:id', async (req, res) => {
    const newCart = req.session.cart.filter(({ id }) => id !== req.params.id);
    req.session.cart = newCart;
    res.status(200).end();
  });

  app.put('/cart/:id', async (req, res) => {
    const indexToBeChanged = req.session.cart.findIndex(
      ({ id }) => id === req.params.id,
    );

    if (indexToBeChanged === -1) {
      res.status(400).end();
      return;
    }

    const itemToBeChanged = req.session.cart[indexToBeChanged];
    if (itemToBeChanged.itemType === 'treatmentCartItem') {
      itemToBeChanged.quantity = req.body.quantity;
      res.status(200).end();
    } else {
      if (req.body.reservationFrom) {
        itemToBeChanged.reservationFrom = req.body.reservationFrom;
      }
      if (req.body.reservationTo) {
        itemToBeChanged.reservationTo = req.body.reservationTo;
      }
      res.status(200).end();
    }
  });

  app.post('/reservations', async (req, res) => {
    if (!req.session.userId) {
      res.status(400).end();
      return;
    }
    const reservation = {
      createdAt: new Date().toLocaleString(),
      items: req.session.cart,
    };
    if (req.session.cart.length > 0) {
      await db.collection('reservations').insertOne(reservation);
    }
    req.session.cart = [];
    res.status(201).end();
  });

  app.get('/reservations', async (req, res) => {
    if (!req.session.userId) {
      res.status(400).end();
      return;
    }
    const reservations = await db.collection('reservations').find().toArray();
    const enrichedReservations = await Promise.all(reservations.map(mapId).map( async (reservation) => ({
      ...reservation,
      items: await enrichItems(reservation.items)
    })));

    res.send(enrichedReservations).end();
  });

  // Serve static files from frontend
  app.use(express.static(path.join(__dirname, 'frontend/dist')))
  // Anything that doesn't match the above, send back index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/dist/index.html'))
  })

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Listeninig on port ${port}`));
});
