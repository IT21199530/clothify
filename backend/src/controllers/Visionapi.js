const { ImageAnnotatorClient } = require('@google-cloud/vision');

// Initialize the Google Cloud Vision client
const client = new ImageAnnotatorClient({ keyFilename: './src/controllers/cloudapi.json' });

// Function to analyze image using Cloud Vision API
async function analyzeImage(imagePath) {
    try {
        const [result] = await client.labelDetection(imagePath);
        const labels = result.labelAnnotations;
        return labels.map(label => label.description);
    } catch (error) {
        console.error('Error analyzing image:', error);
        throw error;
    }
}

module.exports = { analyzeImage };
