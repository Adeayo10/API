const express = require("express");
const debug = require("debug")("app:bookRouter");
const bookRouter = express.Router();
const Book = require("../models/bookModel");

bookRouter.route("/books")
  .post((req, res) => {
    const book = new Book(req.body);
    book.save().then(
      res.status(201)?.json(book));
      debug(`post completed`)
  })
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query).then((err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
    debug("sucesssful book request");
  });

bookRouter.route("/books/:bookId").get((req, res) => {
  const query = req.params.bookId;
  Book.findById(query).then((err, book) => {
    if (err) {
      return res.send(err);
    }
    return res.json(book);
  });
  debug(`sucessful bookId request`);
});
module.exports = bookRouter;
