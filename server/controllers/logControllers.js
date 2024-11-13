// server/controllers/logControllers.js
const Log = require('../models/Log');
const axios = require('axios');

// Function to call Python ML model API
const detectFakeLog = async (log) => {
  try {
    const response = await axios.post('http://localhost:5001/predict', log);
    return response.data.isFake;  // Assuming the response contains a field 'isFake'
  } catch (err) {
    console.error('Error calling ML model:', err.message);
    throw err;  // Rethrow the error to be caught in the controller
  }
};

// Create new log entry
exports.createLog = async (req, res) => {
  const { timestamp, level, message } = req.body;
  
  try {
    const detectedFake = await detectFakeLog({ message });  // Call the ML model
    const newLog = new Log({ timestamp, level, message, detectedFake });
    await newLog.save();  // Save log to the database

    res.status(201).json(newLog);  // Return the newly created log
  } catch (err) {
    res.status(500).json({ error: err.message });  // Return error if something goes wrong
  }
};

// Export the controller functions to be used in routes
