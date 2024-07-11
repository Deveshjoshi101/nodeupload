const express = require("express");
const multer = require("multer");
const File = require("../models/fileModel");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload multiple files
router.post("/upload", upload.array("files", 10), async (req, res) => {
  try {
    console.log("Files:", req.files); // Log the uploaded files
    console.log("Body:", req.body); // Log the request body

    const files = req.files;
    const uploadedFiles = await Promise.all(
      files.map((file) =>
        File.create({
          name: file.originalname,
          data: file.buffer,
        })
      )
    );
    res
      .status(201)
      .json({ message: "Files uploaded successfully", files: uploadedFiles });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: err.message });
  }
});

// Route to get the list of files
router.get("/list", async (req, res) => {
  try {
    const files = await File.findAll({
      attributes: ["id", "name", "createdAt"],
    });
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to download a file by id
router.get("/:id", async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.setHeader("Content-Disposition", "attachment; filename=" + file.name);
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(file.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete a file by id
router.delete("/:id", async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    await File.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
