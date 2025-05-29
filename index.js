const express = require("express");
const app = express();

const port = 3000;

const bookstore = [
  {
    "_id": 1,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "publishedYear": 1960,
    "genre": "Fiction"
  },
  {
    "_id": 2,
    "title": "1984",
    "author": "George Orwell",
    "publishedYear": 1949,
    "genre": "Dystopian"
  },
  {
    "_id": 3,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedYear": 1925,
    "genre": "Classic"
  },
  {
    "_id": 4,
    "title": "Sapiens: A Brief History of Humankind",
    "author": "Yuval Noah Harari",
    "publishedYear": 2011,
    "genre": "History"
  },
  {
    "_id": 5,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "publishedYear": 1988,
    "genre": "Adventure"
  },
  {
    "_id": 6,
    "title": "Atomic Habits",
    "author": "James Clear",
    "publishedYear": 2018,
    "genre": "Self-help"
  },
  {
    "_id": 7,
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "publishedYear": 1954,
    "genre": "Fantasy"
  },
  {
    "_id": 8,
    "title": "Becoming",
    "author": "Michelle Obama",
    "publishedYear": 2018,
    "genre": "Biography"
  },
  {
    "_id": 9,
    "title": "Rich Dad Poor Dad",
    "author": "Robert Kiyosaki",
    "publishedYear": 1997,
    "genre": "Finance"
  },
  {
    "_id": 10,
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt and David Thomas",
    "publishedYear": 1999,
    "genre": "Technology"
  }
]


app.get("/api/books", (req, res) => {
   
    return res.status(200).send(bookstore)
})

app.listen(port, () => {
    console.log(`Port is listening on port: ${port}`)
})