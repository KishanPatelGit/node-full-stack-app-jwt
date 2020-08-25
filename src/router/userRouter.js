const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const Task = require("../model/taskModel");
const router = require("express").Router();
const {
  regValidate,
  regResult,
  loginValidate,
  loginResult,
} = require("../middleware/validation");
const auth = require("../middleware/auth");

// HOME PAGE
router.get("/", async (req, res) => {
  try {
    res.render("home", {});
  } catch (error) {
    console.log(error);
  }
});

// REGISTER
router.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", regValidate, regResult, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.render("register", {
        errors: "Email is Already Register",
      });
    }

    const user = new User(req.body);
    await user.save();
    req.flash("success_msg", "You are now registered and Log In");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

// LOGIN PAGE
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", loginValidate, loginResult, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.render("login", {
        errors: "No User Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("login", {
        errors: "Incorrect Password",
      });
    }

    const token = await user.genAuthToken();

    res.cookie("jwt", token, { httpOnly: true }, { maxAge: 10 });
    res.redirect("/task");
  } catch (error) {
    console.log(error);
  }
});

// LOGOUT
router.get("/logout", auth, async (req, res) => {
  try {
    res.render("task");
  } catch (error) {}
});

router.post("/logout", auth, async (req, res) => {
  try {
    res.cookie("jwt", "");
    res.redirect("/");
  } catch (error) {}
});

module.exports = router;
