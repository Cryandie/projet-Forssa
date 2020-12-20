const express = require("express");
const router = express.Router();
const auth = require("./../Middleware/auth");

const {
  register,
  findUser,
  login,
  authCheck
} = require("../controllers/member.controller");

const {
  RegistrationRules,
  LoginRules,
  validator,
} = require("../Middleware/validator");

//http://localhost:7000/api/auth/user         Registration with Token generator
router.post("/user", RegistrationRules(), validator, register);

//http://localhost:7000/api/auth          Get User by Token through protected route
router.get("/authcheck", validator, auth, authCheck);

//http://localhost:7000/api/auth         Logging in
router.post("/", LoginRules(), validator, login);

module.exports = router;
