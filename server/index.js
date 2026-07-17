require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const eventRoutes = require('./routes/eventRoutes');
const successStoryRoutes = require('./routes/successStoryRoutes');
const imageProxyRoutes = require('./routes/imageProxyRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const seedSuccessStories = require('./utils/seedSuccessStories');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => seedAdmin())
  .then(() => seedSuccessStories())
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'My India Service API is running' });
});

app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/success-stories', successStoryRoutes);
app.use('/api/image-proxy', imageProxyRoutes);
app.use('/api/upload', uploadRoutes);

const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
