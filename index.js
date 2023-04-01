const express = require('express');
const app = express();
const port = 7700;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const { data } = require('./manga4ever.js');

app.get('/', async (req, res) => {
  res.send(data);
})

app.get('/manga', async (req, res) => {
  res.send(data['MangaList']);
})

app.get('/manga/:title', (req, res) => {
  const { title } = req.params;

  const snapshot = Object.entries(data['VolumeList']);
  const wanted = snapshot.filter(([ key, item ]) => item['Title'] === title);

  res.send(wanted);
})

app.get('/volume', async (req, res) => {
  res.send(data['VolumeList']);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})