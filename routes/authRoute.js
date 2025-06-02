const express = require('express');
const router = express.Router();
const {signupHandler} = require('../controllers/signupHandler');
const {loginHandler} = require('../controllers/loginHandler');
const {searchHandler} = require('../controllers/searchHandler');

const { authenticate } = require('../middleware/authMiddleware');

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.get('/search', searchHandler);

module.exports = router;
