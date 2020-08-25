const { check, validationResult } = require("express-validator");

// REGISTRATION VALIDATION
const regValidate = [
  check("name").trim().not().isEmpty().withMessage("Name is required"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter valid Email"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 4, max: 16 })
    .withMessage("Password must be between 4 to 16 characters"),
];

function regResult(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array()[0].msg;

    return res.render("register", {
      errors,
      user: req.body,
    });
  }
  next();
}

// LOGIN VALIDATION
const loginValidate = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter valid Email"),
  check("password").trim().not().isEmpty().withMessage("Password is Required"),
];

function loginResult(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array()[0].msg;
    return res.render("login", {
      errors,
    });
  }
  next();
}
module.exports = { regValidate, regResult, loginValidate, loginResult };
