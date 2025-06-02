const Book = require('../models/Book');

const searchHandler = async (req, res) => {
    const { title, author } = req.query;

    try {
        const query = {};
        
        if (title) {
            query.title = { $regex: title, $options: 'i' }; 
        }

        if (author) {
            query.author = { $regex: author, $options: 'i' }; 
        }

        const books = await Book.find(query);

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found',books: [] });
        }

        res.status(200).json({message: 'Success',books: books });
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { searchHandler }; 
