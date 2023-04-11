const express = require('express');
const router = express();

router.get('/', (req, res) => {
  const type = req.query.type ? req.query.type.toLowerCase() : null;
  const state = req.query.state ? req.query.state.toLowerCase() : null;
  const { Manga } = require('../data/manga.js');

  if(!type && !state) {
    res.send(Manga['MangaList'])
  }
  
  if(type && state) {
    const snapshot = Object.entries(Manga['MangaList']).filter(([key, val]) => {
      return val['Type'].toLowerCase() === type;
    }).filter(([key, val]) => {
      return val['State'].toLowerCase() === state;
    });
    
    const reObject = Object.fromEntries(snapshot);
    res.send(reObject);
  }
  
  if(type && !state) {
    const snapshot = Object.entries(Manga['MangaList']).filter(([key, val]) => {
      return val['Type'].toLowerCase() === type;
    });
    
    const reObject = Object.fromEntries(snapshot);
    res.send(reObject);
  }
  
  if (!type && state) {
    const snapshot = Object.entries(Manga['MangaList']).filter(([key, val]) => {
      return val['State'].toLowerCase() === state;
    });
    
    const reObject = Object.fromEntries(snapshot);
    res.send(reObject);
  }
  
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const { Manga } = require('../data/manga.js');
  const snapshot = Object.entries(Manga['MangaList']);
  const WantedManga = snapshot.filter(([key, val]) => val['ID'] === id);

  const Case = WantedManga && WantedManga.length !== 0 ? Object.fromEntries(WantedManga) : ["nothing add yet"];
  res.send(Case);
});

router.get('/:id/volume', (req, res) => {
  const id = Number(req.params.id);

  const { Manga } = require('../data/manga.js');
  const { Volume } = require('../data/volume.js');

  const mangaSnapshot = Object.values(Manga['MangaList']);
  const volumeSnapshot = Object.entries(Volume['VolumeList']);
  const WantedManga = mangaSnapshot.find(val => val['ID'] === id);
  const WantedVolume = volumeSnapshot.filter(([key, val]) => val['Title'] === WantedManga['Title']);

  const Case = WantedVolume.length !== 0 ? Object.fromEntries(WantedVolume) : ["nothing add yet"];
  res.send(Case);
});

module.exports = router;