const express = require('express');
const router = express();

router.get('/', (req, res) => {
  const { Volume } = require('../data/volume.js');
  res.send(Volume['VolumeList']);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const { Volume } = require('../data/volume.js');
  const snapshot = Object.entries(Volume['VolumeList']);
  const WantedVolume = snapshot.filter(([key, val]) => val['ID'] === id);

  const Case = WantedVolume && WantedVolume.length !== 0 ? Object.fromEntries(WantedVolume) : ["nothing add yet"];
  res.send(Case);
});

module.exports = router;