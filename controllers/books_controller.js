// const books = require("../data/books");
// const fs = require("fs");
const Book  = require('../models/Book')

// util functions
const getAllBooks = (req, res, next) => {
  // res.json(books);
  Book.find()
    .then((books) => {
      res.json(books)
    }).catch(next)
};
const createBook = (req, res, next) => {
  // let book = {
  //   "title": req.body.title,
  //   "author": req.body.author
  // }
  Book.create(req.body)
    .then((books) => {
      res.status(201).json(books)
    }).catch(next)
};

// const createBook = (req, res) => {
//   let new_book = {
//     id: books[books.length - 1].id + 1,
//     title: req.body.title,
//     author: req.body.author,
//   };
//   // console.log(new_book)
//   books.push(new_book);
//   res.status(201).send(books);
// };

// const updateBook = (req, res) => {
//   // res.status(501).json({ reply: "PUT request not submitted"});
//   the_book = books.find((item) => item.id == req.params.id);
//   if (!the_book) {
//     res.status(501).send({ reply: "PUT request not submitted" });
//   } else {
//     the_book["title"] = req.body.title;
//     the_book["author"] = req.body.author;
//     res.json(books);
//   }
// };

const updateBookbyID = (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
  .then((book) => {
    res.json(book)
  }).catch(next)


  // let updatedBooks = books.map((item) => {
  //   if(item.id == req.params.id){
  //     item.title = req.body.title
  //     item.author = req.body.author
  //   }
  //   return item
  // })
  // // console.log(updatedBooks)
  // res.json(updatedBooks)
}

const deleteAllBook = (req, res) => {
  Book.deleteMany()
  .then((reply) => {
    res.json(reply)
  }).catch(console.log)
}

const deleteBookbyID = (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
  .then((reply) => {
    res.json(reply)
  }).catch(next)
  // let newListBook = books.filter((item) => item.id != req.params.id)
  // res.send(newListBook)
};

// const getBook = (req, res) => {
//   the_book = books.find((item) => item.id == req.params.id);
//   if (!the_book) res.status(404).send({ reply: "Book not found" });
//   res.send(the_book);
// };

const getBookbyID = (req, res,next) => {
  // the_book = books.find((item) => item.id == req.params.id);
  // if (!the_book) res.status(404).send({ reply: "Not Found" });
  // res.send(the_book);
  Book.findById(req.params.id)
    .populate('category')
    .then((book)=>{
      res.json(book)
    }).catch(next)
  }

module.exports = {
  getAllBooks,
  createBook,
  // putBook,
  deleteBookbyID,
  getBookbyID,
  updateBookbyID,
  deleteAllBook
};
