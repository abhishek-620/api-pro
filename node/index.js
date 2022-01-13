const express = require("express");
var bodyParser = require("body-parser");

//database
const database = require("./database");

//initialize express
const booky = express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

//get all books
/*
route              /
description     get all books
access         public
parameter      none
methods      get
*/

booky.get("/", (req,res) => {
return res.json({books:database.books});
});

//get a specific book localhost:/12345Book
/*
route              /is
description     get specific  book
access         public
parameter      isbn
methods      get
*/

booky.get("/is/:isbn", (req,res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if(getSpecificBook.length === 0){
    return res.json({
      error:`No book found for ISBN of ${req.params.isbn}`
    });
  }
  return res.json({book:getSpecificBook});
});


//get books on a specific category localhost:/12345Book
/*
route              /c
description       get specific book
access             public
parameter        category
methods           get
*/
booky.get("/c/:category", (req,res) => {
  const getSpecificBook = database.books.filter((book) =>
     book.category.includes(req.params.category)
  );
  if(getSpecificBook.length === 0){
    return res.json({
      error:`No book found for category  of ${req.params.category }`
    });
  }
  return res.json({book:getSpecificBook});
});

//get all authors
/*
route              /author
description     get all authors
access         public
parameter      none
methods      get
*/
booky.get("/author", (req,res)=> {
  return res.json({authors:database.author});
});

//get all authors based on a book
/*
route              /author/book
description     get all authors based on book
access         public
parameter      isbn
methods      get
*/
booky.get("/author/book/:isbn", (req,res) => {
  const getSpecificAuthor = database.author.filter((author) =>
     author.books.includes(req.params.isbn)
  );
  if(getSpecificAuthor.length === 0){
    return res.json({
      error:`No author found for isbn  of ${req.params.isbn }`
    });
  }
  return res.json({authors:getSpecificAuthor});
});

//get all publication
/*
route              /publication
description     get all publications
access         public
parameter      none
methods      get
*/

booky.get("/publications",(req,res)=> {
  return res.json({publications:database.publication});
});

//add new books
/*
route              /book/new
description     get new books
access         public
parameter      none
methods      post
*/

booky.post("/book/new",(req,res) =>{
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBooks:database.books});
});

//add new authors
/*
route              /author/new
description     get new authors
access         public
parameter      none
methods      post
*/

booky.post("/author/new",(req,res) =>{
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json({updatedAuthor:database.author});
});

//add new publications
/*
route              /publication/new
description     get new publications
access         public
parameter      none
methods      post
*/

booky.post("/publication/new",(req,res) =>{
  const newPublication= req.body;
  database.publication.push(newPublication);
  return res.json({updatedPublications:database.publication});
});

booky.listen(3000,() => console.log("the server is up and running"));
