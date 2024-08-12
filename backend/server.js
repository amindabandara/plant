const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const EmployeeModel = require('./models/Employee');
const StoryRouter = require('./routes/story');
const ThreadRouter = require('./routes/Threads');
const PlantGuideRouter = require('./routes/plantguides');
const VideoTutorialRouter = require('./routes/videotutorial');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;
const mongoURI = process.env.MONGO_URI;
const apiUrl = process.env.REACT_APP_API_URL; // Corrected environment variable access

app.use(cors({
  origin: 'https://plant-frontend-g6sw4hjjz-amindas-projects-fd3b8637.vercel.app', // Adjust this to match your frontend URL
}));
app.use(express.json());

// Log MongoDB URI (remove this in production)
console.log('Mongo URI:', mongoURI);

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/storymanager', StoryRouter);
app.use('/threadmanager', ThreadRouter);
app.use('/plantguides', PlantGuideRouter);
app.use('/videotutorials', VideoTutorialRouter);

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ status: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ status: 'Token is not valid' });
    req.user = user;
    next();
  });
};

// Register new employee
app.post('/register', async (req, res) => {
  try {
    const { email, password, name, isAdmin } = req.body;
    const existingEmployee = await EmployeeModel.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ status: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await EmployeeModel.create({ email, password: hashedPassword, name, isAdmin });
    res.json(employee);
  } catch (err) {
    console.error('Error registering employee:', err);
    res.status(500).json({ status: 'Error registering employee', error: err.message });
  }
});

// Login employee
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const isAdmin = user.isAdmin; // Use the field from the database
      const token = jwt.sign({ id: user._id, email: user.email, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ status: 'Success', token, isAdmin });
    } else {
      res.status(400).json({ status: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ status: 'Internal Server Error', error: err.message });
  }
});

// Dashboard route
app.get('/dashboard', authenticateJWT, async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ status: 'Error fetching employees', error: err.message });
  }
});

// Admin route to get all users
app.get('/admin/users', authenticateJWT, (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }

  EmployeeModel.find({})
    .then(users => res.json(users))
    .catch(err => {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    });
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

