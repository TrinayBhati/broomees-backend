const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors(

));

const connectDB = require("./config/database");

const User = require("./Models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // console.log(req.body);

    const { firstName, lastName, email, userName, password } = req.body;

    if (!firstName || !lastName || !email || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ firstName, lastName, email, userName, password });
    // const user = new User(req.body);

    await user.save();
    res.json({ message: "User added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong: " + err.message });
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      res.status(404).send("No User found");
    } else {
      res.send(users);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Something went wrong: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting database: " + err);
  });
