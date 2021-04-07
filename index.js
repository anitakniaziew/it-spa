require('dotenv').config()
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {useUnifiedTopology: true});

client.connect().then( client => {
  const db = client.db();

  app.post('/users', async(req, res) => {
    const {email, password} = req.body
    const user = await db.collection('users').findOne({email: email});
    if (user) {
      res.status(400).end();
      return;
    }
    await db.collection('users').insertOne({
      email: email,
      password: password //hash later
    })
    res.status(201).end();
  })
  
  const port = process.env.PORT || 3000;
  
  app.listen(port, () => console.log(`Listeninig on port ${port}`))
} );
