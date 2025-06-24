const express = require("express");

const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const connectDB = require("./config");
const PORT = process.env.PORT || 5001;

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Job Portal App");
});

app.use("/api", authRoutes);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL, // or MONGO_URI
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false, // set to true if using HTTPS
    },
  })
);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
