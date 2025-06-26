const express = require('express');
const admin = require('firebase-admin');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Firebase Admin Initialization
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// GET /projects
app.get('/projects', async (req, res) => {
  try {
    const snapshot = await db.collection('Projects').get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /events
app.get('/events', async (req, res) => {
  try {
    const snapshot = await db.collection('Events').get();
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /competitions
app.get('/competitions', async (req, res) => {
  try {
    const snapshot = await db.collection('Competition').get();
    const competitions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /news
app.get('/news', async (req, res) => {
  try {
    const snapshot = await db.collection('News').get();
    const news = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});