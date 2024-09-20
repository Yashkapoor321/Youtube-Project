const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();



app.use(cors());
app.use(express.urlencoded);
app.use(express.json());   
app.use(cookieParser());

module.exports = app;