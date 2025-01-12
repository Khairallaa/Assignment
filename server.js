const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');  // Add CORS module

const app = express();
const port = process.env.PORT || 3000;

// TMDb API Key and base URL
const apiKey = '877cac9e2f3debaf375b4930a0bbd6dd';  // Replace with your TMDb API key
const baseUrl = 'https://api.themoviedb.org/3/movie/popular';

// Enable CORS for all origins (or specify a domain like 'http://127.0.0.1:5500')
app.use(cors());

// Endpoint to get popular movies
app.get('/api/popular-movies', async (req, res) => {
    try {
        const response = await axios.get(baseUrl, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1,
            },
        });
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching data from TMDb:', error);
        res.status(500).send('Error fetching data from TMDb');
    }
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
