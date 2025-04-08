const Book = require('../models/Book');

exports.createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: 'Could not add the book check your data and try again.' });
    }
};

exports.getBooks = async (req, res) => {
    try {
        const { author, category, rating, title, sortBy, page = 1, limit = 10 } = req.query;

        const query = {};
        if (author) query.author = author;
        if (category) query.category = category;
        if (rating) query.rating = { $gte: Number(rating) };
        if (title) query.title = { $regex: title, $options: 'i' };

        let booksQuery = Book.find(query);

        if (sortBy === 'price' || sortBy === 'rating') {
            booksQuery = booksQuery.sort({ [sortBy]: 1 });
        }

        const skip = (page - 1) * limit;
        booksQuery = booksQuery.skip(skip).limit(Number(limit));

        const books = await booksQuery;
        const total = await Book.countDocuments(query);

        res.json({
            totalBooks: total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            books
        });
    } catch (err) {
        res.status(500).json({ error: 'Sorry trouble fetching the books try again later.' });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'couldn’t find a book with that ID.' });

        res.json(book);
    } catch (err) {
        res.status(400).json({ error: 'Not a  valid book ID.' });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ error: 'We couldn’t find the book you’re trying to update.' });

        res.json(book);
    } catch (err) {
        res.status(400).json({ error: 'Update failed. Please check the data and try again.' });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: 'No book found with the given ID to delete.' });

        res.json({ message: 'Book deleted successfully.' });
    } catch (err) {
        res.status(400).json({ error: 'Something went wrong. Please check the ID and try again.' });
    }
};
