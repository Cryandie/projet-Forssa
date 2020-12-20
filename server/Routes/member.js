const express = require("express");

const router = express.Router();

const {
  register,
  editProfile,
  deleteProfile,
} = require("../controllers/member.controller");

const { RegistrationRules, validator } = require("../Middleware/validator");

//http://localhost:7000/api/profile/register
router.post("/register", RegistrationRules(), validator, register);

//http://localhost:7000/api/profile/editprofile/ENTER_id
router.put("/editprofile/:_id", editProfile);

//http://localhost:7000/api/profile/deleteprofile/ENTER_id
router.delete("/deleteprofile/:_id", deleteProfile);

module.exports = router;
