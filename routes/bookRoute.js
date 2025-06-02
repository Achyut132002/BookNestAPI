const express = require('express');
const router = express.Router();
const {addBook} = require('../controllers/addbook');
const {getBookById} = require('../controllers/getBookById');
const {postReview} = require('../controllers/postReview');
const {getBooks} = require('../controllers/getBooks');

const { authMiddleware } = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');


router.post('/',adminMiddleware,addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/:id/reviews',authMiddleware, postReview);

module.exports = router;
