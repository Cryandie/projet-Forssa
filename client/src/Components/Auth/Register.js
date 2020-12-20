import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Alert from "../Layout/Alert";
import PropTypes from "prop-types";
import "./register.css";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [registerData, setRegisterData] = useState({
    nom: "",
    prenom: "",
    email: "",
    email2: "",
    password: "",
    password2: "",
  });
  const { nom, prenom, email, email2, password, password2 } = registerData;
  const onChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Vos mots de passe ne sont pas identiques!", "dangerMdp");
    } else if (email !== email2) {
      setAlert("Vos adresses mail ne sont pas identiques!", "dangerMail");
    } else {
      register({ nom, prenom, email, password });
    }
  };
  // Auth Redirection
  if (isAuthenticated === true) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <Alert />
      <h1 className="register-title">Création de compte</h1>
      <form className="register-dad" onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            className="register-input"
            type="text"
            placeholder="Votre Nom"
            name="nom"
            value={nom}
            onChange={(e) => onChange(e)}
            // required="required"
          />
        </div>
        <div>
          <input
            className="register-input"
            type="text"
            placeholder="Votre Prénom"
            name="prenom"
            value={prenom}
            onChange={(e) => onChange(e)}
            // required="required"
          />
        </div>
        <div>
          <input
            className="register-input"
            type="email"
            placeholder="Votre Adresse mail"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            // required="required"
          />
        </div>
        <div>
          <input
            className="register-input"
            type="email"
            placeholder="Confirmez votre Adresse mail"
            name="email2"
            value={email2}
            onChange={(e) => onChange(e)}
            // required="required"
          />
        </div>
        <div>
          <input
            className="register-input"
            type="password"
            placeholder="Votre Mot de passe"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            // required="required"
          />
        </div>
        <div>
          <input
            className="register-input"
            type="password"
            placeholder="Confirmez votre Mot de passe"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            // required="required"
          />
        </div>
        <input type="submit" className="register-btn" value="Register" />
        <div className="login-redirect">
          <h6 className="login-redirect-text">Vous avez déjà un compte ?</h6>
          <NavLink to="/login">
            <button className="login-btn-redirect" type="button">
              Identifiez-Vous
            </button>
          </NavLink>
        </div>
      </form>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
