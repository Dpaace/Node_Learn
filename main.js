require('dotenv').config()
const express = require("express");
const logger = require("./logger");
const path = require("path");
const book_routes = require("./routes/book-routes");
const category_routes = require("./routes/category-routes");
const user_routes = require("./routes/user-routes");
const profile_routes = require("./routes/profile-routes");
const auth = require("./middleware/auth");
const mongoose = require("mongoose");
const cors = require("cors")


const app = express();
app.use(cors())
const port = 3005;

mongoose
  .connect("mongodb://127.0.0.1:27017/books-Dipesh")
  .then(() => {
    console.log("Connected to MongoDB server");
    app.listen(port, () => {
      console.log(`App is running in ${port}`);
    });
  })
  .catch((err) => next(err)); 

// logger
// 1. Application level middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  logger.log(`${req.method} ${req.path}`);
  next();
});

// 2. Express defined middleware
app.use(express.json());

app.get("^/$|/index(.html)?", (req, res) => {
  // res.send("Hello World")
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 3. Router level middleware
app.use("/users", user_routes);
app.use(auth.verifyUser);
// app.use("/profile", profile_routes);
app.use("/profile", auth.verifyUser, profile_routes);
app.use("/books", book_routes);
app.use("/categories", category_routes);


// 4. Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  if (res.statusCode == 200) res.status(500)
  res.json({ err: err.message });
});

// app.get('/books', (req, res) => {
//     res.send("Create a book")
// })

// app.put('/books', (req, res) => {
//     res.status(405).send("Not Allowed HeHe")
// })

// app.delete('/books', (req, res) => {
//     res.send("Delete all Books")
// })

// app.listen(port, () => {
//   console.log(`App is running in ${port}`);
// });
