const express = require('express');
const router = express.Router();
const {updateReview} = require('../controllers/updateReview');
const {deleteReview} = require('../controllers/deleteReview');

const {authMiddleware}= require('../middleware/authMiddleware');

router.put('/:id',authMiddleware,updateReview);
router.delete('/:id',authMiddleware,deleteReview);

module.exports = router;