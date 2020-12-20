import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
// import Alert from "../Layout/Alert";
import PropTypes from "prop-types";
import "./register.css";

const Login = ({ login, isAuthenticated }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Auth Redirection
  if (isAuthenticated === true) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {/* <Alert /> */}
      <h1 className="register-title">Identification</h1>
      <form className="register-dad" onSubmit={(e) => onSubmit(e)}>
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
            type="password"
            placeholder="Votre Mot de passe"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            // required="required"
          />
        </div>

        <input type="submit" className="register-btn" value="Login" />
        <div className="login-redirect">
          <h6 className="login-redirect-text">
            Vous n'avez pas encore de compte ?
          </h6>
          <NavLink to="/register">
            <button className="login-btn-redirect" type="button">
              Inscrivez-Vous
            </button>
          </NavLink>
        </div>
      </form>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
