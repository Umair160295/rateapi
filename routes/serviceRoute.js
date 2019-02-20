const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/serviceCtrl');
router.get('/services/all', serviceCtrl.getAllServices);
router.post('/service/create', serviceCtrl.createService);
router.post('/service/review', serviceCtrl.addReview);
router.post('/search-service', serviceCtrl.search);
module.exports = router;