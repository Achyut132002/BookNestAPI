const Book = require('../models/Book'); 

const deleteReview = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    
    const book = await Book.findOne({ _id: id });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const reviewIndex = book.reviews.findIndex(review => review.userId.toString() === userId);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found or already deleted" });
    }
    book.reviews.splice(reviewIndex, 1); 
   
    await book.save();

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { deleteReview };
