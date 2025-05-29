const express = require("express");
const app = express();

const port = 3000;

const bookstore = [
  {
    "id": 1,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "publishedYear": 1960,
    "genre": "Fiction"
  },
  {
    "id": 2,
    "title": "1984",
    "author": "George Orwell",
    "publishedYear": 1949,
    "genre": "Dystopian"
  },
  {
    "id": 3,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedYear": 1925,
    "genre": "Classic"
  },
  {
    "id": 4,
    "title": "Sapiens: A Brief History of Humankind",
    "author": "Yuval Noah Harari",
    "publishedYear": 2011,
    "genre": "History"
  },
  {
    "id": 5,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "publishedYear": 1988,
    "genre": "Adventure"
  },
  {
    "id": 6,
    "title": "Atomic Habits",
    "author": "James Clear",
    "publishedYear": 2018,
    "genre": "Self-help"
  },
  {
    "id": 7,
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "publishedYear": 1954,
    "genre": "Fantasy"
  },
  {
    "id": 8,
    "title": "Becoming",
    "author": "Michelle Obama",
    "publishedYear": 2018,
    "genre": "Biography"
  },
  {
    "id": 9,
    "title": "Rich Dad Poor Dad",
    "author": "Robert Kiyosaki",
    "publishedYear": 1997,
    "genre": "Finance"
  },
  {
    "id": 10,
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt and David Thomas",
    "publishedYear": 1999,
    "genre": "Technology"
  }
]


app.get("/api/books", (req, res) => {
   
    return res.status(200).send(bookstore)
})

app.get("/api/books/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).send({"msg": "Kindly enter a number"})
    }
    const findBook = bookstore.find(book => book.id === parsedId)
    if (!findBook)  {
        return res.status(400).send({"msg": "something is wrong"});
    }
    res.status(200).send(findBook);

})

app.listen(port, () => {
    console.log(`Port is listening on port: ${port}`)
})