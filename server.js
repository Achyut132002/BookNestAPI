require('dotenv').config();


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoute');
const bookRouter = require('./routes/bookRoute');      
const reviewRouter = require('./routes/reviewRoute');

const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors());
app.use(express.json()); 

app.use('/',authRouter);
app.use('/books', bookRouter);
app.use('/reviews', reviewRouter);




app.get('/', (req, res) => {
    res.send('Book Review API is running!');
  });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    connectDB()
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
         
    });
  });
