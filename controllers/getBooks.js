// GET /books – Get all books (with pagination and optional filters by author and genre) 
// GET /books?page=1&limit=10&author=someAuthor&genre=someGenre
// GET /books?page=1&limit=10&author=someAuthor&genre=someGenre


const Book = require('../models/Book');

const getBooks = async (req, res) => {

    const { page=1, limit=5, author, genre } = req.query;
    console.log('Query Parameters:', { page, limit, author, genre });


    try {
    
    const filter = {};
    if (author) filter.author = author;
    if (genre) filter.genre = genre;

    
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ success: false, message: 'Invalid page number' });
    }

    if (isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({ success: false, message: 'Invalid limit number' });
    }

    const books = await Book.find(filter)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    if (books.length === 0) {
      return res.status(404).json({ success: false, message: 'No books found' });
    }
    
    const total = await Book.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: books,
    });

  } catch (err) {

    console.error('Error fetching books:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = {getBooks};