const express = require('express');
const admin = require('firebase-admin');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Firebase Admin Initialization
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "tinkerclub-895d5",
    "private_key_id": "74b451fa3489c33cb1fecc3f01f94b84b29c8f20",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDhsGpdX8CGUTKT\ndRyKifCxVGejl7iEx4EGJpkSUxhb/qV1inqatTe/sQltKR16JUKcnrT5YNHV2xTH\n2kQHYtlu7c90z7u/4MplQII+1cFZYWMoPMiKHOdPNVLcbhUho5vaw/rl19At9dB6\nezTz6f6NgKOLH4zfZfircxQXB/kpSDCY+zOaHIllAClZfFVpbbM/l7nbGukxzNby\nwVONyjEze5Xwkg9Q8mm6qe0CLEIjTDfg6q5ngQRZkNosn597eV9Ba3zfuSxw/KFj\nXYtTMiyxBQlni8wYXSEfcMf8p2jM+RSz3T16koc+soFgVPAgdf6bfTCcuTljK1HG\nwXx6mYs1AgMBAAECggEAAn9GW7ohyOz3XAJTuDuPo12FbucZt5CtjDkEibbL8jQQ\n0cFEyOBL3jBCJCg1crdlrwA9+qtDlNPmBmSllA0OzkUf66gZ6NvjTyE14gHRMCW0\nSE9ob37IF0ezw5SfqqlVWLXBRzihO1fPziaP/JLr80O5sBj2ahJhoNrf+OONH+83\nzUlbPDvSTKmAbllRlGgY3UeBTfWdi242pt7SGchf8I1CJhnhl7fI+xFtivRdvmxy\ni+DbEpRh6YAHuYajbuEOyUmCeIPZP70WV2xe3SHKkLzlg6N+P7Mr4yymCSLc3tnM\n1eTgYeNt40NkJr/sTzXRFetpmPNZGuZA+PImMgd8EQKBgQDwkoxZxpZkr7/YTRu6\nrVC2harZh+hpg3bNXSwGd+hLr68T4rnciZqYkqTJ8JIqGexOqXzAqLb6fiW7U4um\nlCaXKvBrv1nmUnh/+0mCRtfK9mXUhLzmjE4iP/VKWkWCwkDbz/j25YAevpV8kRVS\nHEM066wL4u8ugi2rwsNcGQgcWwKBgQDwKYd62oOinu3TOCQcCs11e3WL4wLc6onA\nx38rycMHR91OoupCwZyQMxJv/vlEcRldgHdgh4E9pKsKh1k7V+tPOnyQgzWy/9W0\nFqEL8oBqHalOHY99vMe6Qya9J9CMEaT3b0pbMRQZ4ef3v3yr1qm0zLDVuD65y6G0\nBBndi1bLrwKBgGstDsQMOgI/XhuyNpFTF2tJX5Ur/DnNrMbPJIb5Mo9NhJU6ZA1B\nbJNeeXXR7Hw/MkzVK1P1lhdAzfSHwuaCiDK+mX+XLyjyQubZf6U/hHHSlgk43aNk\njIarsc7fKqqXeieznrn4Ar0vsQ9e333GQ5a3C937yw0QR+KGkVxddoSTAoGBAMi1\nvG8U/dxDvHjAu5TgBlO/6T4Oa88bCCMf1w1OYnrMOY1FpEhELMdql2cYDVSAvPUi\nryHyPTW6T+PNt+pbkOG2/HF95rwBCaWnH9KvSVjmDx+kns4znivxgQempajZ+id8\nUAUkYCs9XDL2SogGL/BU/RiwEWQPZcXfg4pesBwrAoGAFeCCfSPMrLXh6rlavKoa\nA/gwGKQILvx5zQD+L3KWWg+2IfQazhg0mJW/B5bBQcqr/LWUaN48p1H/uF0mHZj/\nlRYEG+7qlOG8lnaOXsJFB2dMyNnkdXdr/PjXc1JaYGHBdb3g7MSkrSjNXveoZ/Lc\nSySaIAciny7WIuUR//DxB4Y=\n-----END PRIVATE KEY-----\n",
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