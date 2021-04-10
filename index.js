require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {useUnifiedTopology: true});

const mapId = ({_id, ...rest}) => ({
  id: _id,
  ...rest
})

const parseToObjectId = (id) => {
  try {
    return ObjectId(id);
  }
  catch {
    return null;
  }
}

client.connect().then( client => {
  const db = client.db();

  app.post('/users', async(req, res) => {
    const {email, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await db.collection('users').findOne({email: email});
    if (user) {
      res.status(400).end();
      return;
    }
    await db.collection('users').insertOne({
      email: email,
      password: hash
    })
    res.status(201).end();
  })

  app.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await db.collection('users').findOne({email: email});

    if (user) {
      const hash = user.password;
      const passwordsMatch = await bcrypt.compare(password, hash);

      if (passwordsMatch) {
        req.session.userId = user._id;
        res.status(201).end();
        return;
      }
    }
    res.status(403).end();
  })

  app.get('/logout', async(req, res) => {
    req.session.destroy(() => res.end());
  })

  app.get('/rooms', async(req, res) => {
    const rooms = await db.collection('rooms').find().toArray();
    const parsedRooms = rooms.map(mapId);
    res.send(parsedRooms).end();
  })

  app.get('/rooms/:id', async(req, res) => {
    const roomId = parseToObjectId(req.params.id);
    const room = await db.collection('rooms').findOne({_id: roomId});
    if (room) {
      const parsedRoom = mapId(room);
      res.send(parsedRoom).end();
      return;
    }
    res.status(400).end();
  })

  app.get('/treatments', async(req, res) => {
    const treatments = await db.collection('treatments').find().toArray();
    const parsedTreatments = treatments.map(mapId);
    res.send(parsedTreatments).end();
  })

  app.get('/treatments/:id', async(req, res) => {
    const treatmentId = parseToObjectId(req.params.id);
    const treatment = await db.collection('treatments').findOne({_id: treatmentId});
    if (treatment) {
      const parsedTreatment = mapId(treatment);
      res.send(parsedTreatment).end();
      return;
    }
    res.status(400).end();
  })

  const port = process.env.PORT || 3000;
  
  app.listen(port, () => console.log(`Listeninig on port ${port}`))
} );
