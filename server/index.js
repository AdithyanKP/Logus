import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();
//basic usage
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//route use

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
//mongoose connection

/* onst CONNECTION_URL =
  "mongodb+srv://adithyankp:adithyankp123@cluster0.wu2ak.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; */

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

//port setup
const PORT = 80;
