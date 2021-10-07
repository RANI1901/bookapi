//port window
/*require("dotenv").config();


//headerINFO IS known bet 2 server and client(browser)
//HTTP STATUS CODE indicate success failue or other status 404 fail 200 success 401 unauthorise 500 server error
//JSON standad format to communicate bet 2 servers js objectnotation

//access files
//const fileSystem = require("fs/promises");
//create afile
//fileSystem.appendFile("first.txt","hello");
//fileSystem.rdir("second");
//const operatingSystem = require("os");
//console.log(operatingSystem.platform());
const  express = require("express");
const mongoose = require("mongoose");
const database = require("./database");
//configuations
const booky  = express();

booky.use(express.json()) ;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => console.log("connection established!!!!!!!"));
/*GET---
get allbooks
get specific bookbasedon ISBN
GETSPECIFIC BOOKBASEDON CATEGOY

 ALL AUTHORS
 ALLAUTHOBSEDONISBN
 ALL PUBLICATIONS
 AUTHOR BELONGINGTOSPECIFICPUBLICATION
*/

/*
TOGETALLBOOKS
@ROUTE/books
@paams-
returntype jsonobject
method get
*/
/*
booky.get("/",(req,res) =>{
    return res.json({books:database.books});
});

booky.get("/:isbn",(req,res) =>{
    const specificbook = database.books.filter(
        (book) =>book.ISBN === req.params.isbn);
    
    if(specificbook.length ===0){
        return res.json({ error: `no book  found of ISBN ${req.params.isbn}`,
    });
}
    //({books:database.books});
    return res.json({book:specificbook});
});
booky.get("/c/:category",(req,res) =>{
    const specificbooks = database.books.filter(
        (book) =>book.category.includes(req.params.category));
    
    if(specificbooks.length ===0){
        return res.json({error: `no book  found of category ${req.params.category}`,
    });
}
    //({books:database.books});
    return res.json({book:specificbooks});
});
booky.get("/author",(req,res) =>{
    return res.json({authors:database.authors});
    

    
});
booky.get("/author/:authors",(req,res) =>{
    const getSpecificAuthors = database.authors.filter(
        (author) =>author.books.includes(req.params.isbn)
        );
    if(getSpecificAuthor .length ===0){
        return res.json({ error: `no book  found of authors ${req.params.authors}`,
    });
}
    //({books:database.books});
    return res.json({authors:getSpecificAuthors});
});
booky.get("/publications/",(req,res) =>{
    return res.json({publications:database.publications});
     
});

booky.get("/publications/:publications",(req,res) =>{
    const getSpecifiPublications = database.publications.filter(
        (publication) =>publications.books.includes(req.params.id)
        );
    if(getSpecifiPublications .length ===0){
        return res.json({ error: `no book  found of publications ${req.params.publications}`,
    });
}
    //({books:database.books});
    return res.json({authors:getSpecifiPublications});
});
booky.post("/book/new",(req,res)=>{           //new/:isbn/:author.......all attributesee cann be inputted but  lenghthy method
const {newBook}= req.body;
                 //destructurring is used  when object and var  same so by doing this it cpoies
                 database.books.push(newBook);
                 return res.json({books:database.books,message:"book was added "});         
});

booky.listen(8000,()=>console.log("server running"));
*/
require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
//Database
const database = require("./database/database");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//Initialise express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}
).then(() => console.log("Connection Established"));



/*
Route            /
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
booky.get("/",async (req,res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

/*
Route            /is
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/is/:isbn",async (req,res) => {

const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

//null !0 = 1 , !1=0
  if(!getSpecificBook) {
    return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
  }

  return res.json({book: getSpecificBook});
});


/*
Route            /c
Description      Get specific book on category
Access           PUBLIC
Parameter        category
Methods          GET
*/

booky.get("/c/:category", async (req,res) => {
  const getSpecificBook = await BookModel.findOne({category: req.params.category});

  //null !0 = 1 , !1=0
    if(!getSpecificBook) {
      return res.json({error: `No book found for the category of ${req.params.category}`});
    }

    return res.json({book: getSpecificBook});
});


/*
Route            /author
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/author", async (req,res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

/*
Route            /author/book
Description      Get all authors based on books
Access           PUBLIC
Parameter        isbn
Methods          GET
*/

booky.get("/author/book/:isbn", (req,res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.books.includes(req.params.isbn)
  );

  if(getSpecificAuthor.length === 0){
    return res.json({
      error: `No author found for the book of ${req.params.isbn}`
    });
  }
  return res.json({authors: getSpecificAuthor});
});

/*
Route            /publications
Description      Get all publications
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/publications",async (req,res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
})


//POST

/*
Route            /book/new
Description      Add new books
Access           PUBLIC
Parameter        NONE
Methods          POST
*/

booky.post("/book/new",async (req,res) => {
  const { newBook } = req.body;
  const addNewBook = BookModel.create(newBook);
  return res.json({
    books: addNewBook,
    message: "Book was added !!!"
  });
});

/*
Route            /author/new
Description      Add new authors
Access           PUBLIC
Parameter        NONE
Methods          POST
*/

booky.post("/author/new",async (req,res) => {
const { newAuthor } = req.body;
const addNewAuthor = AuthorModel.create(newAuthor);
  return res.json(
    {
      author: addNewAuthor,
      message: "Author was added!!!"
    }
  );
});

/*
Route            /publication/new
Description      Add new publications
Access           PUBLIC
Parameter        NONE
Methods          POST
*/

booky.post("/publication/new", (req,res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json(database.publication);
});

/**************PUT***************/
/*
Route            /book/update
Description      Update book on isbn
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/book/update/:isbn",async (req,res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn
    },
    {
      title: req.body.bookTitle
    },
    {
      new: true
    }
  );

  return res.json({
    books: updatedBook
  });
});

/*********Updating new author**********/
/*
Route            /book/author/update
Description      Update /add new author
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/book/author/update/:isbn", async(req,res) =>{
  //Update book database
const updatedBook = await BookModel.findOneAndUpdate(
  {
    ISBN: req.params.isbn
  },
  {
    $addToSet: {
      authors: req.body.newAuthor
    }
  },
  {
    new: true
  }
);

  //Update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor
    },
    {
      $addToSet: {
        books: req.params.isbn
      }
    },
    {
      new: true
    }
  );

  return res.json(
    {
      bookss: updatedBook,
      authors: updatedAuthor,
      message: "New author was added"
    }
  );
} );









/*
Route            /publication/update/book
Description      Update /add new publication
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
  //Update the publication database
  database.publication.forEach((pub) => {
    if(pub.id === req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });

  //Update the book database
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn) {
      book.publications = req.body.pubId;
      return;
    }
  });

  return res.json(
    {
      books: database.books,
      publications: database.publication,
      message: "Successfully updated publications"
    }
  );
});

/****DELETE*****/
/*
Route            /book/delete
Description      Delete a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
*/

booky.delete("/book/delete/:isbn", async (req,res) => {
  //Whichever book that doesnot match with the isbn , just send it to an updatedBookDatabase array
  //and rest will be filtered out

  const updatedBookDatabase = await BookModel.findOneAndDelete(
    {
      ISBN: req.params.isbn
    }
  );

  return res.json({
    books: updatedBookDatabase
  });
});

/*
Route            /book/delete/author
Description      Delete an author from a book and vice versa
Access           PUBLIC
Parameter        isbn, authorId
Methods          DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
  //Update the book database
   database.books.forEach((book)=>{
     if(book.ISBN === req.params.isbn) {
       const newAuthorList = book.author.filter(
         (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
       );
       book.author = newAuthorList;
       return;
     }
   });


  //Update the author database
  database.author.forEach((eachAuthor) => {
    if(eachAuthor.id === parseInt(req.params.authorId)) {
      const newBookList = eachAuthor.books.filter(
        (book) => book !== req.params.isbn
      );
      eachAuthor.books = newBookList;
      return;
    }
  });

  return res.json({
    book: database.books,
    author: database.author,
    message: "Author was deleted!!!!"
  });
});


booky.listen(8000,() => {
  console.log("Server is up and running");
});