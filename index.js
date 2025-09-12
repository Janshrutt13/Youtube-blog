const express = require('express');
const path = require('path');
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require('mongoose');
const Blog = require("./models/blog");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { checkforAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = 8000;

mongoose.connect(process.env.MONGO_URI)
.then(e => console.log("MongoDB connected!"));

//Middlewares
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser);
app.use(checkforAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

//Views
app.set('view engine' , "ejs");
app.set("views" , path.resolve('./views'));

//Routes
app.get("/" , async(req,res) => {
    const allBlogs = await Blog.finf({});
    res.render("home" , {
        user : req.user,
        blogs : allBlogs
    });
});

app.use("/users" , userRoute);
app.use("/blogs" , blogRoute);

app.listen(PORT, () => console.log(`Server has started on port : ${PORT}`));