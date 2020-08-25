require("./db/mongoose");
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(flash());

app.use(
  session({
    secret: "kishan",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

const userRouter = require("./router/userRouter");
app.use(userRouter);

const taskRouter = require("./router/taskRouter");
app.use(taskRouter);

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.listen(port);
console.log("app run on ", port);
