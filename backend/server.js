const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');




// dotenv.config()
// dotenv.config({ path: './.env' })
dotenv.config({ path: path.resolve(__dirname, '.env') });



//Connection URL
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

//Database Name
const dbName = 'passop';
const app = express()
const port = 3000


// client.connect();
async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDB();

app.use(bodyparser.json())
app.use(express.json());


const allowedOrigins = [
  "https://pass-op-password-manager-ten.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
    res.status(401).json({ message: 'Token is not valid', err });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// app.post('/api/user/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file was uploaded.' });
//     }
//     const avatarUrl = `/uploads/${req.file.filename}`;
//     const db = client.db(dbName);
//     const usersCollection = db.collection('users');
//     await usersCollection.updateOne(
//       { _id: new ObjectId(req.user.id) },
//       { $set: { avatarUrl: avatarUrl } }
//     );
//     res.json({ success: true, message: 'Avatar updated successfully.', avatarUrl: avatarUrl })

//   } catch (error) {
//     res.status(500).json({ message: 'Server error during avatar upload.', error })
//   }
// })
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.post('/api/user/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'passop_avatars'
    });
    const avatarUrl = result.secure_url;

    const db = client.db(dbName);
    await db.collection('users').updateOne(
      { _id: new ObjectId(req.user.id) },
      { $set: { avatarUrl } }
    );

    res.json({ success: true, message: 'Avatar updated', avatarUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading avatar', error });
  }
});






// GET CURRENT USER'S INFO
app.get('/api/user/me', authMiddleware, async (req, res) => {
  try {
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(req.user.id) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ username: user.username, avatarUrl: user.avatarUrl });

  } catch (error) {
    res.status(500).json({ message: "Server error.", error })
  }
})
// UPDATE USER'S PROFILE
app.put('/api/user/profile', authMiddleware, async (req, res) => {
  try {
    const { newUsername, newPassword } = req.body;
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    const updates = {};
    if (newUsername) {
      updates.username = newUsername;
    }
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No updates provided." });
    }
    await usersCollection.updateOne({ _id: new ObjectId(req.user.id) }, { $set: updates });
    res.json({ message: "Profile updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }

})
// VERIFY CURRENT PASSWORD
app.post('/api/user/verify-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword } = req.body;
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(req.user.id) });
    if (!user) {

      return res.status(404).json({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (isMatch) {
      res.json({ success: true, message: "Password verified" })
    } else {
      res.status(400).json({ success: false, message: "Incorrect password." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error during password verification.", error });
  }
});

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
    res.status(500).json({ message: "Server error during signup.", error });
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
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '19h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error during login.", error });
  }
});




// Get all the passwords for the logged-in user
app.get('/', authMiddleware, async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({ userId: req.user.id }).toArray();
  res.json(findResult);
});

// Save a password for the logged-in user
app.post('/', authMiddleware, async (req, res) => {
  const passwordData = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.insertOne({ ...passwordData, userId: req.user.id });
  res.json({ success: true, result: result });
});




// --- APPLICATION STATUS ROUTE  ---
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    serverTime: new Date().toISOString()
  });
});

// Delete a password by id, ensuring it belongs to the logged-in user
app.delete('/', authMiddleware, async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  // const result = await collection.deleteOne({ id: id, userId: req.user.id });
  const result = await collection.deleteOne({ _id: new ObjectId(id), userId: req.user.id });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "Password not found or user not authorized." });
  }
  res.json({ success: true, result: result });
});

// Edit or Update a password by its ID, ensuring it belongs to the logged-in user
app.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updatedPasswordData = req.body;
  delete updatedPasswordData._id;
  delete updatedPasswordData.userId;

  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.updateOne(
    { _id: new ObjectId(id), userId: req.user.id },
    { $set: updatedPasswordData }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "Password not found or user not authorized." });
  }
  res.json({ success: true, result: result });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
