import express from "express";
import dotenv from "dotenv";
import { dataSource } from "./datasource";
import router from "./todo/todo.router";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

dataSource
  .initialize()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use("/todos", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
