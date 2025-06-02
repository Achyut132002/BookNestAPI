const Book = require('../models/Book');
const User = require('../models/User');

const postReview = async (req, res) => {
    const { id } = req.params; 
    const { rating , comment } = req.body; 

    try {
        
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        
        const userId = req.user.id; 
        const existingReview = await Book.findOne({
            _id: id,
            'reviews.userId': userId
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already submitted a review for this book' });
        }

        const review = { userId, rating, comment };

        
        book.reviews.push(review);
        await book.save();

        res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { postReview };

