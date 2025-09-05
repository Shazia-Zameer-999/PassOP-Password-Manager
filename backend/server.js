const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')


dotenv.config()

//Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

//Database Name
const dbName = 'passop';
const app = express()
const port = 3000


client.connect();
app.use(bodyparser.json())
app.use(express.json());
app.use(cors())


//Get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save a password
app.post('/', async (req, res) => {
  const password = req.body; // Get the password object from the request body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  // Insert the new password into the collection
  const result = await collection.insertOne(password);
  // Send a success response back
  res.json({ success: true, result: result });
});



// Delete a password by id
app.delete('/', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required for deletion." });
  }

  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne({ id: id });

  res.json({ success: true, result: result });
});

//Edit or Update a password by its ID
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPasswordData = req.body;
  delete updatedPasswordData._id;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required to update." });
  }

  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.updateOne(
    { id: id },
    { $set: updatedPasswordData }
  );
  res.json({ success: true, result: result });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
