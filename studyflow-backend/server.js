const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true
}));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'studyflow'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Signup route
app.post('/api/auth/signup', (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  const query = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';

  db.execute(query, [first_name, last_name, email, password, role], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).send('Error inserting data into the database');
    } else {
      res.status(200).send({ message: 'User signed up successfully', role });
    }
  });
});

// Login route
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = ?';

  db.execute(query, [email, password, role], (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).send('Error fetching data from the database');
    } else if (results.length > 0) {
      res.status(200).send({ message: 'Login successful', role: results[0].role });
    } else {
      res.status(401).send({ message: 'Invalid email, password, or role' });
    }
  });
});

// User route
app.get('/api/auth/user', (req, res) => {
  const userId = req.query.id; // Adjust as per your implementation

  const query = 'SELECT * FROM users WHERE id = ?';
  db.execute(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Error fetching user data');
    } else if (results.length > 0) {
      res.status(200).send(results[0]);
    } else {
      res.status(404).send('User not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
