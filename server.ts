const express = require("express");
const connectDB = require("./config/db");
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

//initialize middleware
app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/users", require("./routes/api/users"));

//app.get("/", (request:any, response:any)=> response.send("Hello, World"));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
export{}