const debug = require("debug")("app:bookController");
function bookController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send(`Title is required`);
    }
    book.save();
    res.status(201);
    debug(`post completed`);
    return res.json(book);
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query)
      .then((books) => {
        //Hypermedia
        const returnBooks = books.map((book) => {
          const newBook = book.toJSON();
          newBook.links = {};
          newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
          debug(`sucesssful book request`);
          return newBook;
        });
        debug(`sucesssful book request`);
        return res.status(200).json(returnBooks);
      })
      .catch((error) => {
        debug(`error is ${error}`);
        return res.status(400).send(error);
      });
  }
  return { post, get };
}

module.exports = bookController;
