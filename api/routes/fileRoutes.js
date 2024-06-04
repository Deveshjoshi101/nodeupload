const express = require('express');
const multer = require('multer');
const File = require('../models/fileModel');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload a file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = await File.create({
      name: req.file.originalname,
      data: req.file.buffer
    });
    res.status(201).json({ message: 'File uploaded successfully', fileId: file.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get the list of files
router.get('/list', async (req, res) => {
  try {
    const files = await File.findAll({
      attributes: ['id', 'name', 'createdAt']
    });
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to download a file by id
router.get('/:id', async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.setHeader('Content-Disposition', 'attachment; filename=' + file.name);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(file.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete a file by id
router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    await File.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
