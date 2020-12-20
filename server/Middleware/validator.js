const { check, validationResult } = require("express-validator");

exports.RegistrationRules = () => [
  check("nom", "Veuillez saisir votre nom").notEmpty(),
  check("prenom", "Veuillez saisir votre prénom").notEmpty(),
  // check("mobile", "Please enter a valid mobile-phone number").isLength({
  //   min: 8,
  // }),
  check("email", "Veuillez saisir une Adresse Mail valide").isEmail(),
  check("email", "Veuillez saisir votre Adresse Mail").notEmpty(),
  check(
    "password",
    "Veuillez saisir un Mot de passe avec au moins 6 caractères"
  ).isLength({ min: 6 }),
];
exports.LoginRules = () => [
  check("email", "Veuillez saisir une Adresse Mail valide").isEmail(),
  check("email", "Veuillez saisir votre Adresse Mail").notEmpty(),
  check("password", "Veuillez saisir votre Mot de passe").notEmpty(),
];
exports.ProfileValidator = () => [
  check(
    "fonction",
    "Veuillez remplir le champ fonction par le service que vous proposez"
  ).notEmpty(),
  check(
    "pseudo",
    "Veuillez remplir le champ pseudo par le service que vous proposez"
  ).notEmpty(),
];

exports.validator = (req, res, next) => {
  const error = validationResult(req);

  error.isEmpty() ? next() : res.status(401).json({ errors: error.array() });
};
