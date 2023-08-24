const express = require("express");
const {connection} = require('./db');
const cors = require("cors");
const {userRouter} = require("./routes/userRoute");
const {blogRouter} = require("./routes/blogRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users",userRouter);
app.use("/blogs",blogRouter);


app.listen(8080, async() => {
  try{
    await connection
    console.log('Server started on port 8080');
  } catch(err){
    console.log(err.message)
  }
});
