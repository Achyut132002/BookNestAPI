

const Book = require('../models/Book');

const getBookById = async (req, res) => {
    try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const book = await Book.findById({_id: id});
      
    
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    
    const totalRatings = book.reviews.reduce((sum, r) => sum + r.rating, 0);

    if(book.reviews.length === 0) {
        res.status(404).json({ success: false, message: 'No reviews found for this book' });
    }

    const avgRating = book.reviews.length ? totalRatings / book.reviews.length : 0;

    
    const start = (parseInt(page) - 1) * parseInt(limit);
    const paginatedReviews = book.reviews.slice(start, start + parseInt(limit));

    res.status(200).json({
      success: true,
      book: {
        id: book._id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        averageRating: avgRating.toFixed(2),
        totalReviews: book.reviews.length,
        reviews: paginatedReviews,
        page: parseInt(page),
        totalPages: Math.ceil(book.reviews.length / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('Error fetching book details:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = {getBookById};




