const express = require('express');
const admin = require('firebase-admin');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Firebase Admin Initialization
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "tinkerclub-895d5",
    "private_key_id": "57f1a65bef2ceb15d65847d47748ea34e37c527e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZq97JiQchjjsJ\nsuOwmjKDgrrUBi1Opj98CcBNcWHQvd0yu3avZ7TNAPGYf08SP0nm8ehPEprQjEa5\ndKk2QFK9i+KogySv0KGzHK6ywoQE76VmndauKELMyWF+73N9tXCD8yLFO6iX7ckf\nWY+7cZbBfb9TELWpm8vbIjryIfldif07SGbA3sCa1JdDm/tjgV8Fqwy5O/9WyeAL\nsR2Fykoo1+aDvnETVs5CRZb8/a2pqBBv3qaye7tYKzt8JEVt/byX5Pd4vglLbCVj\n/1M1LN/eC/gTfPYRytCBcuJR1A5Khw9tO5L0BAQHMtqKNHeBWOq6rESBuqYkt71T\n8byMq/LXAgMBAAECggEARg6oHMtKjUU+wSdfWwa1/VfFE9qNGIQvaJem2gYFCm8h\nU2O8lkXVjimgmIlZBLFz8q2nLFP7meWcGbJvh7N6LeFo6P2UgDWw5Xn0zDoIzaHn\n5Tgl0VXJ8ilahMVCsZIFDaLibQJ/h66TjdCAjz7G263CN1TocxderD+/IxFGNhFM\nZ7okswtGIsEx9gqSH6Lig6eqaQpG61ag7/jlV2ZTuJZAymDkoo58NkLQEMlISFpe\n6XFQIItI3Rg6Jp+UlTA2YcW2yWKV8B3GcGZ80UU1sEeBBY/6uIUxNgtldyZFQawv\nJmmNtlTdrZQfBgd3UVnHaHLPA8qn8JQZ1dhRSBquUQKBgQD1+RWecG1+jUtMFDaV\njzBfpDkDsdoBO0aJMbsdQdb7UVyZe458eQVWmvRDLvecPf/AojYtvNfBkbX1yEQz\n9J2Q23fhZRFa9SNtgbrJQHHH0IqxghEJb6ZyQgEUJW4rUNxKJs1pbo1aeUeWudOX\n11Q+ntuF2XV9Jj/jYHbIdtSFuQKBgQDii2/WUVdCS5ZeT0wN5XDzpmd2oIcejbmi\nuRKK9drHNv99VBghg+/IHGy3S14bZr8NgK8qQSytyFaTVLoBRj8BokhOH4DZ8qtV\nqMCuzlePp35SoZNXTAh0+h/T5TUIB4WZE/tGQBhZAnhumBguv9CMSIx7b9OD292p\nTsh1AjeFDwKBgQDqeC3rgjBd2kJUm1AM8Rmjkd/nbbnqQp7SWN2M3h4YI06p3+XL\nMXGtRLhi8nqGLXOGJRqQLttcYZGaYPTiseMhGpQD/1uz4MmMsYVkIlJTrq8G1n13\nCT8Y22I72hJSqBnVdXeJcSC9ha6AN1NEArcDmlqYFNqyGav9Cw8vuFaNwQKBgAE0\n1uKgSkOrHWDhMTl9uE1D3JcwIagS/yMTszqUNpcK/u9O7FX5WuSI6jdLqnOg53GN\n9uDVugQu5e8g62CoXBuJHrNzzX7boPfyzxvfM24raSvNenhjikP9NQAu30psp9R5\n28OzAa4vqi6EltRg5x5oIH9jyA+Ssyp8peqhmWQXAoGAJuxE4HH8xtDbLKC80VBK\nX9HkLDDltF7BNYWbXg3KzV3FeCf9C8R0iip5jRE/hQmRxgAKbK4WGE0u44wB8rMJ\nKtG3k/Vw58ZzghTSWN4/wzOir8ctARXdC1skBE3YJQp0RtQizpllO1OC+BjxSy6P\nM8E0RJggTOzj8y5nqX1x8Vg=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@tinkerclub-895d5.iam.gserviceaccount.com",
    "client_id": "115783473934041522160",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tinkerclub-895d5.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  })
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