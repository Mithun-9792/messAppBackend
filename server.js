const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const userRoutes = require("./routes/user");

const app = express();

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON data (if needed)
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
