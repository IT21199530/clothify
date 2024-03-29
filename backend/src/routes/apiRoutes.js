const express = require('express');
const multer = require('multer');
const visionAPI = require('../controllers/Visionapi');

const router = express.Router();

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Route to handle image upload and analysis
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;
        const labels = await visionAPI.analyzeImage(imagePath);
        res.json({ labels });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

module.exports = router;
