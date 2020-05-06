const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
app.get("/", (req, res) =>
  res.json({ msg: "welcome to the contact keeper API" })
);
//Connect database
connectDB();
//Init middleware
app.use(express.json({ extended: false }));
//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}"`));
