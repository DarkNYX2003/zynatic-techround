const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

router.use(auth);
router.route('/').post(createBook).get(getBooks);
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;