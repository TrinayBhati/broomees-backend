// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const validator = require("validator");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://sauravbedwal1234:LAxU7xXSS9gO09WJ@namastenodesauravbedwal.vwabz.mongodb.net/broomees",
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     );
//     console.log("Database connected");
//   } catch (err) {
//     console.log("Error connecting to database: " + err.message);
//     process.exit(1);
//   }
// };

// // User Schema
// const userSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       minlength: 3,
//       maxlength: 10,
//     },
//     lastName: {
//       type: String,
//       required: true,
//       minlength: 3,
//       maxlength: 10,
//     },
//     email: {
//       type: String,
//       required: true,
//       lowercase: true,
//       unique: true,
//       trim: true,
//       validate(value) {
//         if (!validator.isEmail(value)) {
//           throw new Error("Invalid email address: " + value);
//         }
//       },
//     },
//     userName: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//       validate(value) {
//         if (!validator.isStrongPassword(value)) {
//           throw new Error("Enter Strong Password: " + value);
//         }
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("User", userSchema);

// // Routes
// app.post("/signup", async (req, res) => {
//   try {
//     const { firstName, lastName, email, userName, password } = req.body;

//     if (!firstName || !lastName || !email || !userName || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = new User({ firstName, lastName, email, userName, password });
//     await user.save();
//     res.json({ message: "User added successfully" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ message: "Something went wrong: " + err.message });
//   }
// });

// app.get("/user", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       res.status(404).send("No User found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).send("Something went wrong: " + err.message);
//   }
// });

// // Start Server
// connectDB()
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Server is running on port 3000");
//     });
//   })
//   .catch((err) => {
//     console.log("Error connecting database: " + err);
//   });



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const validator = require("validator");

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection (Only connect when the function is invoked)
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(
        "mongodb+srv://sauravbedwal1234:LAxU7xXSS9gO09WJ@namastenodesauravbedwal.vwabz.mongodb.net/broomees",
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      console.log("Database connected");
    } catch (err) {
      console.error("Error connecting to database: " + err.message);
      throw err;
    }
  }
};

// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password: " + value);
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// Routes
app.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, userName, password } = req.body;

    if (!firstName || !lastName || !email || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ firstName, lastName, email, userName, password });
    await user.save();
    res.json({ message: "User added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong: " + err.message });
  }
});

app.get("/api/user", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No User found");
    } else {
      res.send(users);
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// Export the app for Vercel
module.exports = app;
