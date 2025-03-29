import Express from "express";
import type { Request, Response } from "express";
import "reflect-metadata";
import createDatabase from "./database";
import { User } from "./models/User";
require("dotenv").config();

const database = createDatabase(
  process.env.DB_HOST || "localhost",
  process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : 3306,
  process.env.DB_USERNAME || "root",
  "",
  process.env.DB_NAME || "intprog"
);

const app = Express();
const userRepository = database.getRepository(User);

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

/**
 * [GET] /users/
 * @author INSERT NAME HERE
 */
app.get("/users", async (req: Request, res: Response) => {
  try {
    // Fetch all users from the database
    const users = await userRepository.find();

    // Return users in JSON format
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/**
 * [POST] /users/
 * @author INSERT NAME HERE
 */
app.post("/users", (req: Request, res: Response) => {
  const userRepository = database.getRepository(User);
});

/**
 * [DELETE] /users/:id
 * @author INSERT NAME HERE
 */
app.delete("/users/:id", (req: Request, res: Response) => {
  const userRepository = database.getRepository(User);
});

app.listen(3000, (err) => {
  console.log("Server running...");
});

database
  .initialize()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error connecting to database...");
  });
