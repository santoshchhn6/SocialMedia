import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./Routes/AuthRoute.js";
import postsRoute from "./Routes/PostsRoute.js";

dotenv.config();

const app = express();

const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));
app.use("/", authRoute);
app.use("/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
