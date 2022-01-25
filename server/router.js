const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>server is up and running</h1>');
});

module.exports = router; 