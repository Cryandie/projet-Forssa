import "./profile.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { createProfile } from "../../actions/profile";
import { Fragment } from "react";
import { getCurrentProfile } from "../../actions/profile";
const EditProfile = ({ createProfile, getCurrentProfile, isAuthenticated, history, profile: { profile, loading } }) => {
  const [formData, setFormData] = useState({
    pseudo: "",
    age: "",
    num_tel: "",
    lieu: "",
    fonction: "",
    description: "",
    youtube: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",
  });
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
  } = formData;
  useEffect(() => {
    getCurrentProfile();
}, [getCurrentProfile]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return !loading && !profile &&(
    <Fragment>
      <h1 className="editprofile-title"> Paramètres de profil </h1>
      <Modal.Header>
        <Modal.Title className="modaltitle">
          les champs avec * sont obligatoires
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="modalform" onSubmit={(e) => onSubmit(e)}>
          <input
            value={pseudo}
            onChange={(e) => onChange(e)}
            name="pseudo"
            type="text"
            placeholder="Votre Pseudo*"
            required="required"
          />
          <input
            value={age}
            onChange={(e) => onChange(e)}
            name="age"
            type="text"
            placeholder="Votre age"
          />
          <input
            value={num_tel}
            onChange={(e) => onChange(e)}
            name="num_tel"
            type="text"
            placeholder="Votre numéro de portable"
          />
          <input
            value={lieu}
            onChange={(e) => onChange(e)}
            name="lieu"
            type="text"
            placeholder="Votre ville*"
            required="required"
          />
          <input
            value={fonction}
            onChange={(e) => onChange(e)}
            name="fonction"
            type="text"
            placeholder="Votre fonction*"
            required="required"
          />
          <input
            value={description}
            onChange={(e) => onChange(e)}
            name="description"
            type="text"
            placeholder="Votre description*"
            required="required"
          />
          <input
            value={youtube}
            onChange={(e) => onChange(e)}
            name="youtube"
            type="text"
            placeholder="Votre Youtube si vous en avez"
          />
          <input
            value={twitter}
            onChange={(e) => onChange(e)}
            name="twitter"
            type="text"
            placeholder="Votre Twitter si vous en avez"
          />
          <input
            value={facebook}
            onChange={(e) => onChange(e)}
            name="facebook"
            type="text"
            placeholder="Votre Facebook si vous en avez"
          />
          <input
            value={linkedin}
            onChange={(e) => onChange(e)}
            name="linkedin"
            type="text"
            placeholder="Votre Linkedin si vous en avez"
          />
          <input
            value={instagram}
            onChange={(e) => onChange(e)}
            name="instagram"
            type="text"
            placeholder="Votre Instagram si vous en avez"
          />
          <div className="edit-form-btns">
            <Button className="modalbtnsub" variant="primary" type="submit">
              Enregistrer
            </Button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Fragment>
  )
}

EditProfile.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
