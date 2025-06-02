// add new book
const Book = require('../models/Book');

const addBook = async (req, res) => {
    const { title, author, genre } = req.body;
    // calculate the user id from the token
    const addedBy = req.user.id; // Assuming req.user is populated with user info from middleware

    try {
        const newBook = new Book({ title, author, genre, addedBy});
        
        const existingBook = await Book.findOne({ title, author });
        if (existingBook) {
            return res.status(400).json({ message: 'Book already exists' });
        }

        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addBook };