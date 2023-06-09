const express = require('express');
const router = express();

router.get('/', (req, res) => {
  const { CoversList } = require('../data/new/CoversList.js');
  res.send(CoversList['CoversList']);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const { CoversList } = require('../data/new/CoversList.js');
  const snapshot = Object.entries(CoversList['CoversList']);
  const WantedVolume = snapshot.filter(([key, val]) => val['ID'] === id);

  const Case = WantedVolume && WantedVolume.length !== 0 ? Object.fromEntries(WantedVolume) : ["nothing add yet"];
  res.send(Case);
});

module.exports = router;