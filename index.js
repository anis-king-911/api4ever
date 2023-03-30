const express = require('express');
const app = express();
const port = 7700;

const { data } = require('./manga4ever.js');

app.get('/', async (req, res) => {
  res.send(data);
})

app.get('/manga', async (req, res) => {
  const mangaSnapshot = Object.entries(data['MangaList']);
  res.send(mangaSnapshot);
})

app.get('/volume', async (req, res) => {
  const volumeSnapshot = Object.entries(data['VolumeList']);
  res.send(volumeSnapshot);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})