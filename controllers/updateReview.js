// controllers/reviewController.js
const Book = require('../models/Book');

const updateReview = async (req, res) => {
  const id = req.params.id;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  try {
    
    const book = await Book.findOne({ "_id": id });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const review = book.reviews.find(review => review.userId.toString() === userId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    review.rating = rating;
    review.comment = comment;
    book.reviews = book.reviews.map(r => r.userId.toString() === userId ? review : r);
    await book.save();

    res.json({ message: "Review updated successfully", review });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { updateReview };
