const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

//cookie-parse - what is this and why we need this
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

require("./config/database").connect();

//route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

//activated server
if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`App is Listening at ${PORT}`);
    })
}

//default Route
app.get("/", (req, res) => {
    res.send(`<h1>This is Aman Sah</h1>`);
})

module.exports = app;