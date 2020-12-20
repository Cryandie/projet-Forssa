import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "./navbar.css";

const MainNavbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <>
      <div className="navbar">
        <NavLink className="navlinklogo" exact to="/">
          <h1 className="navlogo">Forssa</h1>
        </NavLink>
        <div className="navlink">
          <NavLink
            className="navlink"
            activeClassName="active-link"
            exact
            to="/"
          >
            Accueil
          </NavLink>
          <NavLink
            className="navlink"
            activeClassName="active-link"
            to="/profiles"
          >
            Services
          </NavLink>
          <NavLink
            className="navlink"
            activeClassName="active-link"
            to="/profile"
          >
            Profil
          </NavLink>
          {loading === false && isAuthenticated === true ? (
            <Fragment>
              {" "}
              <NavLink className="navlink" to="/" onClick={logout}>
                Déconnexion
              </NavLink>
            </Fragment>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

MainNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(MainNavbar);
