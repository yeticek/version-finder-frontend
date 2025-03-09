// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 9998;

// Enable CORS for all routes
app.use(cors());

app.use(express.static(path.join(__dirname, 'version-finder-frontend/build')));

app.get('/api/response', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/api/response`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'version-finder-frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});