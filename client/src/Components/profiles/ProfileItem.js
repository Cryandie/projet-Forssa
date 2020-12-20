import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import Avatar from "../../Assets/Avatar.png";
import "./profiles.css";

const ProfileItem = ({
  profile: { user, _id, pseudo, age, num_tel, lieu, fonction, description },
}) => {
  return (
    <div className="profile">
      <div className="profilecards">
        <Card className="card-prof" style={{ width: "18rem" }}>
          <Card.Title className="card-title">- {pseudo} -</Card.Title>
          <Link to={`/profile/user/${_id}`}>
            <Card.Img
              className="avatar-img"
              variant="top"
              src={Avatar}
              alt="avatar"
            />{" "}
          </Link>
          <Card.Body className="card-body">
            <Card.Text className="card-txt">
              Fonction: <span className="card-dyn-txt"> {fonction}</span>
            </Card.Text>
            <Card.Text className="card-txt">
              Lieu: <span className="card-dyn-txt">{lieu} </span>
            </Card.Text>
            <Card.Text className="card-txt">
              Description: <span className="card-dyn-txt"> {description}</span>
            </Card.Text>
            <Card.Text className="card-txt">
              Téléphone: <span className="card-dyn-txt">{num_tel} </span>{" "}
            </Card.Text>
            <Card.Text className="card-txt">
              Age: <span className="card-dyn-txt"> {age} ans </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
