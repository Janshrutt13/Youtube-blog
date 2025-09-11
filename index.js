const express = require('express');
const path = require('path');
const userRoute = require("./routes/user");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 8000;

mongoose.connect(process.env.MONGO_URI)
.then(e => console.log("MongoDB connected!"));

app.use(express.urlencoded({ extended : false }));

//Views
app.set('view engine' , "ejs");
app.set("views" , path.resolve('./views'));

//Routes
app.get("/" , (req,res) => {
    res.render("home");
});

app.use("/users" , userRoute);

app.listen(PORT, () => console.log(`Server has started on port : ${PORT}`));