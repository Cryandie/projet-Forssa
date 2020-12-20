import "./profile.css";
import React, { useEffect, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "../../Assets/Avatar.png";
import UpdateProfile from "./UpdateProfile";
import {
  FiFacebook,
  FiYoutube,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";
// import { login } from "../../actions/auth";
// import CreateProfile from "./CreateProfile"; Will be UpdateProfile modal
import { getCurrentProfile } from "../../actions/profile";

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, social, loading },
  isAuthenticated,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  if (loading && !profile) {
    return <Redirect to="/editprofile" />;
  }
  return (
    !loading &&
    profile && (
      <Fragment>
        <div className="prof-container">
          <h2 className="prof-pseudo">- {profile.pseudo} -</h2>
          <img className="prof-img" src={Avatar} alt="avatar" />{" "}
          <div className="prof-body">
            <p className="prof-txt">
              Fonction:{" "}
              <span className="prof-dyn-txt"> {profile.fonction}</span>
            </p>
            <p className="prof-txt">
              Lieu: <span className="prof-dyn-txt">{profile.lieu} </span>
            </p>
            <p className="prof-txt">
              Description: <br />
              <span className="prof-dyn-txt"> {profile.description}</span>
            </p>
            <p className="prof-txt">
              Téléphone:{" "}
              <span className="prof-dyn-txt">{profile.num_tel} </span>{" "}
            </p>
            <p className="prof-txt">
              Age: <span className="prof-dyn-txt"> {profile.age} ans </span>
            </p>

            <FiFacebook className="socialicons">
              <Link to=""> </Link>
            </FiFacebook>
            <FiYoutube className="socialicons">
              <Link to=""> </Link>
            </FiYoutube>
            <FiTwitter className="socialicons">
              <Link to=""> </Link>
            </FiTwitter>
            <FiLinkedin className="socialicons">
              <Link to=""> </Link>
            </FiLinkedin>
            <FiInstagram className="socialicons">
              <Link to=""> </Link>
            </FiInstagram>
          </div>
          <UpdateProfile />
        </div>
      </Fragment>
    )
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
