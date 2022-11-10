const express = require("express");
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const contactRoute = require("./routes/contact");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected.");
    })
    .catch((error) => {
      console.log(error);
    });
};

app.use(express.json());

app.use("/leapsail/api/auth", authRoute);
app.use("/leapsail/api/user", userRoute);
app.use("/leapsail/api/contact", contactRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  connectDB();
  console.log("server running.");
});
