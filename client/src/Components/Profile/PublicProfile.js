import "./profile.css";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
import { getProfileById } from "../../actions/profile";
import { Card } from "react-bootstrap";
import Avatar from "../../Assets/Avatar.png";
import { Fragment } from "react";
import {
  createFeedback,
  getFeedbacks,
  updateFeedback,
} from "../../actions/feedback";
import ReactStars from "react-stars";
import { Modal, Button } from "react-bootstrap";
const PublicProfile = ({
  feedback,
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
  createFeedback,
  getFeedbacks,
  updateFeedback,
}) => {
  useEffect(() => {
    getProfileById(match.params.profileid);
    getFeedbacks(match.params.profileid);
  }, [getFeedbacks, getProfileById, match.params.profileid]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [feedBackData, setFeedBackData] = useState({
    id: "",
    user: "",
    profileId: "",
    content: "",
    rating: 0,
  });
  useEffect(() => {
    setFeedBackData({
      profileId: loading || !profile._id ? "" : profile._id,
    });
  }, [loading, profile]);
  const { content, rating } = feedBackData;
  const onChange = (e) => {
    setFeedBackData({ ...feedBackData, [e.target.name]: e.target.value });
    console.log(feedBackData);
  };
  const ratingChanged = (newRating) => {
    setFeedBackData({ ...feedBackData, rating: newRating });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createFeedback(
      { content: content, rating: rating },
      feedBackData.profileId
    );
    setFeedBackData({
      ...feedBackData,
      content: "",
      rating: 0,
    });
    getFeedbacks(feedBackData.profileId);
  };
  const onEditClick = (e, index) => {
    const feedEdit = feedback.feedbacks[index];
    console.log(feedEdit);
    setFeedBackData({
      ...feedBackData,
      id: feedback.loading || !feedEdit._id ? "" : feedEdit._id,
      content: feedback.loading || !feedEdit.content ? "" : feedEdit.content,
      rating: feedback.loading || !feedEdit.rating ? "" : feedEdit.rating,
      user: feedback.loading || !feedEdit.user ? "" : feedEdit.user,
    });
    getFeedbacks(match.params.profileid);
    handleShow();
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
    updateFeedback({ content: content, rating: rating }, feedBackData.id);
    setFeedBackData({
      ...feedBackData,
      content: "",
      rating: 0,
    });
    getFeedbacks(match.params.profileid);
    handleClose();
  };
  return (
    !loading &&
    profile && (
      <Fragment>
        <div className="container">
          <div className="d-flex p-2 bd-highlight">
            <div>
              <div className="card" style={{ width: "24rem" }}>
                <Card.Img
                  className="avatar-img"
                  variant="top"
                  src={Avatar}
                  alt="avatar"
                />
                <div className="card-body">
                  <h5 className="card-title">{profile.pseudo}</h5>
                  <p className="card-text">Age: {profile.age}</p>
                  <p className="card-text">Tel: {profile.num_tel}</p>
                  <p className="card-text">Loc: {profile.lieu}</p>
                  <p className="card-text">Fonction: {profile.fonction}</p>
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              {auth.user._id !== profile.user ? (
                <form
                  onSubmit={(e) => {
                    onSubmit(e);
                  }}
                  className="mb-3 ml-4"
                >
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Write feedback
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    id="content"
                    name="content"
                    type="text"
                    placeholder="Your feedback"
                    value={content}
                    onChange={(e) => onChange(e)}
                  />
                  <ReactStars
                    id="rating"
                    value={Number(rating)}
                    count={10}
                    onChange={ratingChanged}
                    size={32}
                    color2={"#ffd700"}
                  />
                  <button
                    type="submit"
                    class=" mt-4 btn"
                    style={{ backgroundColor: "rgba(145, 69, 245, 0.829)" }}
                  >
                    Save
                  </button>
                </form>
              ) : (
                ""
              )}

              <div className="mb-3 ml-4">
                <div class="card">
                  <div class="card-header">Feedbacks</div>
                  {feedback.feedbacks &&
                    feedback.feedbacks.map((feed, index) => {
                      return (
                        <div key={feed._id} class="card-body">
                          <blockquote class="blockquote mb-0">
                            <p>{feed.content}</p>
                            <ReactStars
                              value={Number(feed.rating)}
                              count={10}
                              edit={false}
                            />
                            <footer class="blockquote-footer">
                              {feed.user}
                            </footer>
                          </blockquote>
                          {feed.user === auth.user._id ? (
                            <button
                              onClick={(e) => onEditClick(e, index)}
                              type="button"
                              class="btn btn-dark mt-2"
                            >
                              Edit
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Feedback</Modal.Title>
                </Modal.Header>
                <form
                  onSubmit={(e) => {
                    onEditSubmit(e);
                  }}
                  className="mb-3 mx-4"
                >
                  <textarea
                    className="form-control mt-4"
                    rows="3"
                    id="content"
                    name="content"
                    type="text"
                    placeholder="Your feedback"
                    value={content}
                    onChange={(e) => onChange(e)}
                  />
                  <ReactStars
                    id="rating"
                    value={Number(rating)}
                    count={10}
                    onChange={ratingChanged}
                    size={32}
                    color2={"#ffd700"}
                  />
                  <button
                    type="submit"
                    class=" mt-4 btn"
                    style={{ backgroundColor: "rgba(145, 69, 245, 0.829)" }}
                  >
                    Save
                  </button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

PublicProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createFeedback: PropTypes.func.isRequired,
  getFeedbacks: PropTypes.func.isRequired,
  updateFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  feedback: state.feedback,
});

export default connect(mapStateToProps, {
  getProfileById,
  createFeedback,
  getFeedbacks,
  updateFeedback,
})(PublicProfile);
