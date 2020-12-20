const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Member = require("../Models/Member");

//Registration
exports.register = async (req, res) => {
  const { nom, prenom, password, email } = req.body;
  let uniqueMember = await Member.findOne({ email });
  if (uniqueMember)
    return res
      .status(401)
      .json({ registerError: "invalid Account: This email is already used" });
  else
    try {
      const user = new Member({
        nom,
        prenom,
        password,
        email,
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user.password = hash;

      await user.save(user);
      //Token Creation
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "10h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );

      // res.status(200).json({ info: "Registration completed, Welcome!", user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: error });
    }
};
// Find User By ID
exports.findUser = async (req, res) => {
  try {
    const user = await Member.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Member.findOne({ email });
    if (!user) {
      return res.status(401).json({
        loginError:
          "Identifiants inconnus, veuillez vérifier votre Adresse Mail et votre Mot de passe",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        loginError:
          "Identifiants inconnus, veuillez vérifier votre Adresse Mail et votre Mot de passe",
      });
    }
    //Login Token Creation
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: error });
  }
};

// Update existing user
exports.editProfile = async (req, res) => {
  const { nom, prenom, password, email } = req.body;
  const { _id } = req.params;

  try {
    const updateMember = await Member.findOneAndUpdate(
      { _id },
      { $set: req.body }
    );
    return res.status(201).send(updateMember);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
};

//Delete existing Profile
exports.deleteProfile = async (req, res) => {
  const { _id } = req.params;
  try {
    const removedProfile = await Member.findOneAndDelete({ _id });
    return res.status(201).send(removedProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
};
exports.authCheck = async (req, res) => {
  try {
    const user = await Member.findById(req.user.user.id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json("Server error");
  }
};
