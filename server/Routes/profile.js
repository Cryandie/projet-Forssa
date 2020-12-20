const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const { ProfileValidator } = require("../Middleware/validator");
const {
  getProfile,
  createProfile,
  getProfiles,
  getProfileId,
} = require("../controllers/profile.controller");

//http://localhost:7000/api/profile/me     Getting user Profile
router.get("/me", auth, getProfile);

//http://localhost:7000/api/profile        User Profile creation+Update
router.post("/", auth, ProfileValidator(), createProfile);

//http://localhost:7000/api/profile         Get All profiles
router.get("/", getProfiles);

//http://localhost:7000/api/profile/user/SAISIR-USER-ID   Get Profile by user ID
router.get("/user/:profileId", getProfileId);

module.exports = router;
