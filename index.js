// const { default: mongoose } = require("mongoose");
const app = require("./app")
const port = process.env.PORT || 3005;

// mongoose.connection.once('')
app.listen(port, () => {
  console.log(`App is running in ${port}`);
});
