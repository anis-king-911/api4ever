const express = require('express');
const app = express();
const port = 7700;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const main = {
  "manga": "https://api4ever.vercel.app/manga",
  "volume": "https://api4ever.vercel.app/volume",
  "titles": "https://api4ever.vercel.app/titles"
}

app.get('/', (req, res) => {
  res.send(main);
})

app.get('/manga', (req, res) => {
  const { Manga } = require('./data/manga.js');
  res.send(Manga['MangaList']);
})

app.get('/volume', (req, res) => {
  const { Volume } = require('./data/volume.js');
  res.send(Volume['VolumeList']);
})

app.get('/titles', (req, res) => {
  const { Titles } = require('./data/titles.js');
  const newTitles = [...new Set(Titles)].sort().filter(i => i !== '');

  res.send(newTitles);
})

/*
app.get('/manga/:title', (req, res) => {
  const title = req.params.title;
  const type = req.query.type;

  const snapshot = Object.entries(data['VolumeList']);
  const wantedByTitle = snapshot.filter(([ key, item ]) => item['Title'] === title);
  const wantedByType = wantedByTitle.filter(([ key, item ]) => item['Type'] = type);

  res.send(wantedByType);
})
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})