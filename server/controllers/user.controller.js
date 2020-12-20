const User = require("../Models/User");

//Adding new user to the DB
exports.addUser = async (req, res) => {
  const { nom, prenom, password, email } = req.body;

  try {
    const newUser = new User({
      nom,
      prenom,
      password,
      email,
    });
    newUser.save(newUser);
    res.status(201).json({ info: "User successfully added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
};

// Displaying existing users
exports.displayUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(201).json(getUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
};

// Update existing user
exports.editUser = async (req, res) => {
  const { nom, prenom, password, email } = req.body;
  const { _id } = req.params;

  try {
    const updateUser = await User.findOneAndUpdate({ _id }, { $set: req.body });
    return res.status(201).send(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
};

//Delete existing user
exports.deleteUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const removedUser = await User.findOneAndDelete({ _id });
    return res.status(201).send(removedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
};
