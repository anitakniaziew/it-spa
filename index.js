require('dotenv').config()
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {useUnifiedTopology: true});

client.connect().then( client => {

  app.get('/', async(req, res) => {
    const treatments = await client.db().collection('treatments').find({}).toArray();
    res.send(treatments);
  })
  
  const port = process.env.PORT || 3000;
  
  app.listen(port, () => console.log(`Listeninig on port ${port}`))
} );
