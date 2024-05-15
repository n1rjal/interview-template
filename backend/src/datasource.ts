import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const dataSource: DataSource = new DataSource({
  logging: true,
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  cache: true,
  entities: ["./**/*.entity.js"],
  name: "default",
  port: parseInt(process.env.DB_PORT!),
});
