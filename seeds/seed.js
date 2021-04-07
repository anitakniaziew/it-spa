require('dotenv').config()

const treatments = require('./treatments.json');
const rooms = require('./rooms.json');

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {useUnifiedTopology: true});

client.connect().then( async client => {
  const db = client.db();
  await db.collection('treatments').deleteMany({});
  await db.collection('rooms').deleteMany({});
  await db.collection('treatments').insertMany(treatments);
  await db.collection('rooms').insertMany(rooms);
  client.close()
  }
);
