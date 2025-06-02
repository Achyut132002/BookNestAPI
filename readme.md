# Billeasy Book Review API

A RESTful API for managing books, user authentication, and book reviews. Built with Node.js, Express, and MongoDB.

## Features

- User signup and login with JWT authentication
- Admin-only book addition
- Search books by title or author
- Get all books with pagination and filters (author, genre)
- Get book details with paginated reviews and average rating
- Authenticated users can post, update, and delete their reviews

## Project Structure

```
Billeasy/
├── config/         # Configuration files (e.g., DB, JWT)
├── controllers/    # Route handler logic
├── middleware/     # Custom middleware (auth, admin, etc.)
├── models/         # Mongoose models (User, Book, Review)
├── routes/         # Express route definitions
├── server.js       # Entry point of the application
├── .env            # Environment variables
├── package.json    # Project metadata and scripts
└── readme.md       # Project documentation
```


## Getting Started

### Prerequisites

- Node.js
- Express.js
- MongoDB

### Installation

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory with the following content:
    ```
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRATION=1h
    MONGODB_URI=mongodb://localhost:27017/bookstore
    PORT=3000
    ```
4. Start the server:
    ```
    npm run dev
    ```

## API Endpoints

### Auth

- `POST /signup` – Register a new user
- `POST /login` – Login and receive a JWT

### Books

- `GET /books` – List all books (pagination, filter by author/genre)
- `GET /books/:id` – Get book details with paginated reviews
- `POST /books` – Add a new book (admin only)
- `GET /search` – Search books by title or author

### Reviews

- `POST /books/:id/reviews` – Add a review (authenticated users)
- `PUT /reviews/:id` – Update your review (authenticated users)
- `DELETE /reviews/:id` – Delete your review (authenticated users)

## Middleware

- `authMiddleware` – Protects routes for authenticated users
- `adminMiddleware` – Restricts access to admin-only routes

## Schema

## Schema

**User**
```js
{
  name: String,
  email: String,
  password: String, // hashed
  isAdmin: Boolean
}
```

**Book**
```js
{
  title: String,
  author: String,
  genre: String,
  addedBy: ObjectId, // User reference
  reviews: [ObjectId] // Review references
}
```

**Review**
```js
{
  userId: ObjectId, // User reference
  rating: Number,
  comment: String
}
```

## License

ISC

---




