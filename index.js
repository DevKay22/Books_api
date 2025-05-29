const express = require("express");
const app = express();
app.use(express.json());


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

    // Validate ID
    if (isNaN(parsedId)) {
        return res.status(400).send({ msg: "Kindly enter a valid numeric ID." });
    }

    // Find book
    const findBook = bookstore.find(book => book.id === parsedId);
    if (!findBook) {
        return res.status(404).send({ msg: "Book not found." });
    }

    // Success
    return res.status(200).send(findBook);
});


// POST REQUEST
app.post("/api/books", (req, res) => {
    const { title, author, publishedYear, genre } = req.body;

    // Basic validation
    if (!title || !author || !publishedYear || !genre) {
        return res.status(400).send({ msg: "All fields (title, author, publishedYear, genre) are required." });
    }

    const lastId = bookstore.length > 0 ? bookstore[bookstore.length - 1].id : 0;
    const newBook = {
        id: lastId + 1,
        title,
        author,
        publishedYear,
        genre
    };

    bookstore.push(newBook);
    return res.status(201).send(newBook);
});

app.put("/api/books/:id", (req, res) => {
    const { body, params: { id } } = req;
    const parsedId = parseInt(id);

    // Validate ID
    if (isNaN(parsedId)) {
        return res.status(400).send({ msg: "Kindly use a valid numeric ID." });
    }

    // Find book index
    const bookIndex = bookstore.findIndex(book => book.id === parsedId);

    if (bookIndex === -1) {
        return res.status(404).send({ msg: "Book not found." });
    }

    // Validate required fields
    const { title, author, publishedYear, genre } = body;
    if (!title || !author || !publishedYear || !genre) {
        return res.status(400).send({ msg: "All fields (title, author, publishedYear, genre) are required." });
    }

    // Update the book
    bookstore[bookIndex] = {
        id: parsedId,
        title,
        author,
        publishedYear,
        genre
    };

    res.status(200).send({
        msg: "Book updated successfully.",
        updatedBook: bookstore[bookIndex]
    });
});


app.patch("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    // Validate ID
    if (isNaN(parsedId)) {
        return res.status(400).send({ msg: "Invalid book ID." });
    }

    // Find the book
    const bookIndex = bookstore.findIndex(book => book.id === parsedId);
    if (bookIndex === -1) {
        return res.status(404).send({ msg: "Book not found." });
    }

    const existingBook = bookstore[bookIndex];
    const updates = req.body;

    // Only update fields that exist in the body
    const allowedFields = ["title", "author", "publishedYear", "genre"];
    for (const key in updates) {
        if (allowedFields.includes(key)) {
            existingBook[key] = updates[key];
        }
    }

    res.status(200).send({
        msg: "Book updated successfully (partially).",
        updatedBook: existingBook
    });
});

app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    // Validate ID
    if (isNaN(parsedId)) {
        return res.status(400).send({ msg: "Invalid book ID." });
    }

    // Find the book
    const bookIndex = bookstore.findIndex(book => book.id === parsedId);
    if (bookIndex === -1) {
        return res.status(404).send({ msg: "Book not found." });
    }

    // Delete the book
    const deletedBook = bookstore.splice(bookIndex, 1); // remove and return the deleted book

    return res.status(200).send({
        msg: "Book deleted successfully.",
        deleted: deletedBook[0]
    });
});





app.listen(port, () => {
    console.log(`Port is listening on port: ${port}`)
})