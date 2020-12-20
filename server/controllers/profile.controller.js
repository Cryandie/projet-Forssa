const Profile = require("../Models/Profile");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

//Get user profile
exports.getProfile = async (req, res) => {
  // console.log(req.user.user.id);
  try {
    const profile = await Profile.findOne({
      user: req.user.user.id,
    }).populate("member", ["nom", "prenom"]);

    // const payload = {
    //   user: {
    //     id: req.user.id,
    //   },
    // };
    if (!profile) {
      return res.status(404).json("not found");
      // .json({ msg: `Ce membre n'a pas encore de profile` })
    }
    res.json({ profile });
    // jwt.sign(
    //   payload,
    //   config.get("jwtSecret"),
    //   { expiresIn: 3600 },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token, profile });
    //   }
    // );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Create+update user profile
exports.createProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    pseudo,
    age,
    num_tel,
    lieu,
    fonction,
    description,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body;
  //Build profile object
  const profileFields = {};
  profileFields.user = req.user.user.id;
  if (pseudo) profileFields.pseudo = pseudo;
  if (age) profileFields.age = age;
  if (num_tel) profileFields.num_tel = num_tel;
  if (lieu) profileFields.lieu = lieu;
  if (fonction) profileFields.fonction = fonction;
  if (description) profileFields.description = description;

  //Build Social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.user.id });
    if (profile) {
      //update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }
    //create
    profile = new Profile(profileFields);
    await profile.save();
    return res.status(200).json({ profile });
    // console.log({ profile });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Getting all profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("member", ["nom", "prenom"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Get user-Profile by ID
exports.getProfileId = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId).populate("member", ["nom", "prenom"]);
    if (!profile) return res.status(400).json({ msg: `Aucun profil trouvé` });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: `Aucun profile trouvé` });
    }
    res.status(500).send("Server Error");
  }
};
