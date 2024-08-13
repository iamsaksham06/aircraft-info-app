// backend/index.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/aviation', async (req, res) => {
  try {
    // Prepare parameters for the AviationStack API
    // Only include parameters that are supported by your subscription plan
    const params = {
      access_key: process.env.AVIATIONSTACK_API_KEY,
      flight_status: req.query.flight_status, // Supported
      dep_iata: req.query.dep_iata,           // Supported
      arr_iata: req.query.arr_iata,           // Supported
    };

    // Check for any undefined parameters and remove them
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });

    const response = await axios.get('http://api.aviationstack.com/v1/flights', { params });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from AviationStack API:", error.message);

    if (error.response && error.response.status === 403) {
      return res.status(403).json({
        error: 'Your current subscription plan does not support this API function. Please upgrade your plan or modify your request.',
      });
    }

    res.status(500).json({ error: 'Error fetching data from AviationStack API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
