const express = require('express');
const mongoose = require('mongoose');
const Event = require('./models/event');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const DB_URL = 'mongodb://localhost:27017/event';

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('connected to database');
  })
  .catch((error) => {
    console.log('error connecting to database ', error);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/events', async (req, res) => {
  const events = await Event.find({});
  if (events) return res.status(200).json(events);
  else return res.status(404).json();
});

app.get('/events/:id', async (req, res) => {
  const events = await Event.findOne({ _id: req.params.id });
  if (events) return res.status(200).json(events);
  else return res.status(404).json();
});

app.delete('/events/:id', async (req, res) => {
  const events = await Event.deleteOne({ _id: req.params.id });
  if (events) return res.status(200).json(events);
  else return res.status(404).json();
});

app.post('/event', async (req, res) => {
  console.log('req.body=', req.body);
  const event = new Event(req.body);
  const result = await event.save();
  return res.status(200).json(result);
});

const server = app.listen(5000, () => {
  console.log('server started at ', server.address().port);
});


