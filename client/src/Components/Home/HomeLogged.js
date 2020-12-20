import React, { useEffect } from "react";
import "./home.css";
// import { HomeFooter } from "./HomeFooter";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

const HomeLogged = ({ getCurrentProfile, auth: { user } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <div className="homelog-container">
      <div className="homelog">
        <h1 className="auth-welcm">Bonjour {user && user.prenom} ! </h1>
        <h2 className="auth-welcm">
          Nous sommes ravis de vous avoir parmi nous
        </h2>
      </div>
      <div className="logged-content">
        <h3 className="services-intro">
          Si vous avez besoin d'un service vous pouvez en choisir en cliquant
          sur <br /> <br /> <br />
          <Link className="services-link-main" to="./profiles">
            <span className="services-link">Nos Services</span>{" "}
          </Link>
        </h3>
        <h3 className="secservices-intro">
          Si vous souhaitez proposer un service , veuillez d'abord modifier
          votre profil afin de fournir les détails reliés à votre activité à vos
          futurs clients en cliquant sur <br /> <br />
          <Link className="services-link-main" to="./editprofile">
            <span className="secservices-link">Editer mon profil</span>
          </Link>
        </h3>
      </div>
    </div>
  );
};
HomeLogged.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getCurrentProfile })(HomeLogged);
