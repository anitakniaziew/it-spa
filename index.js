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

const parseId = ({_id, ...rest}) => ({
  id: _id,
  ...rest
})

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
    const parsedRooms = rooms.map(parseId);
    res.send(parsedRooms).end();
  })

  app.get('/rooms/:id', async(req, res) => {
    const room = await db.collection('rooms').findOne({_id: ObjectId(req.params.id)});
    if (room) {
      const parsedRoom = parseId(room);
      res.send(parsedRoom).end();
      return;
    }
    res.status(400).end();
  })

  app.get('/treatments', async(req, res) => {
    const treatments = await db.collection('treatments').find().toArray();
    const parsedTreatments = treatments.map(parseId);
    res.send(parsedTreatments).end();
  })

  app.get('/treatments/:id', async(req, res) => {
    const treatment = await db.collection('treatments').findOne({_id: ObjectId(req.params.id)});
    if (treatment) {
      const parsedTreatment = parseId(treatment);
      res.send(parsedTreatment).end();
      return;
    }
    res.status(400).end();
  })
  
  const port = process.env.PORT || 3000;
  
  app.listen(port, () => console.log(`Listeninig on port ${port}`))
} );
