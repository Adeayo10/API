const express = require("express");
const bookRouter = express.Router();
const Book = require("../models/bookModel");
const bookController = require("../controllers/bookController")(Book);
const debug = require("debug")("app:bookRouter");

bookRouter.route("/books").post(bookController.post).get(bookController.get);

//middleware
bookRouter.use("/books/:bookId", (req, res, next) => {
  const query = req.params.bookId;
  Book.findById(query)
    .then((book) => {
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    })
    .catch((error) => {
      debug(`error is ${error}`);
      return res.status(404).send(error);
    });
});
bookRouter
  .route("/books/:bookId")
  .get((req, res) => {
    const returnBook = req.book.toJSON();
    returnBook.links = {};
    const genre = req.book.genre.replace(" ", "%20");
    returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
    res.json(returnBook);
    debug(`sucessful bookId request`);
  })
  .put((req, res) => {
    const { book } = req;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    book.save().then(res.status(201)?.json(book));
    debug(`object updated `);
  })
  .patch((req, res) => {
    const { book } = req;
    req.body._id ? delete req.body._id : null;
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
      req.book.save().then(res.status(200)?.json(book));
      debug(`Specific object updated `);
    });
  })
  .delete((req, res) => {
    req.book.deleteOne().then(res.sendStatus(204));
  });
module.exports = bookRouter;
