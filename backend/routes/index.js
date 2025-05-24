const express = require('express');
const router = express.Router();
const { testDBConnection } = require('../controllers/health.controller');
const authRoutes = require("./auth.routes");
const pollRoutes = require("./poll.routes");

router.get('/', testDBConnection);
router.use('/auth', authRoutes);
router.use('/poll', pollRoutes);


module.exports = router;
