const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
// SIGNUP Route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await usersCollection.insertOne({ username, password: hashedPassword });
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error during signup." });
  }
});

// LOGIN Route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const payload = { user: { id: user._id.toString() } }; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error during login." });
  }
});


const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};


// Get all the passwords for the logged-in user
app.get('/', authMiddleware, async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({ userId: req.user.id }).toArray(); // Find only user's passwords
  res.json(findResult);
});

// Save a password for the logged-in user
app.post('/', authMiddleware, async (req, res) => {
  const passwordData = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.insertOne({ ...passwordData, userId: req.user.id }); // Add userId
  res.json({ success: true, result: result });
});




// Delete a password by id, ensuring it belongs to the logged-in user
app.delete('/', authMiddleware, async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne({ id: id, userId: req.user.id }); // Add userId check
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "Password not found or user not authorized." });
  }
  res.json({ success: true, result: result });
});

// Edit or Update a password by its ID, ensuring it belongs to the logged-in user
app.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updatedPasswordData = req.body;
  delete updatedPasswordData._id; // Good practice
  delete updatedPasswordData.userId; // Prevent user from changing the owner

  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.updateOne(
    { id: id, userId: req.user.id }, // Add userId check
    { $set: updatedPasswordData }
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "Password not found or user not authorized." });
  }
  res.json({ success: true, result: result });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
