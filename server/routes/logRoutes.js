// server/routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logControllers = require('../controllers/logControllers');  // Ensure this path is correct

// Define the POST route for creating a log
router.post('/logs/create', logControllers.createLog);  // Calls createLog function from the controller

module.exports = router;
