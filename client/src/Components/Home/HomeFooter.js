import React from "react";
import "./home.css";
import FeedbackImage from "../../Assets/FeedbackImage.png";
import FeedbackImageP from "../../Assets/FeedbackImageP.png";

export const HomeFooter = () => {
  return (
    <div className="homefooter fbgrid">
      <div className="feedback-content ">
        <h2 className="feedback-text">Votre avis compte !</h2>
        <p>Faites nous part de vos remarques et de vos suggestions</p>
        <button className="feedback-btn">Laissez un feedback</button>
      </div>
      <div className="feedback-img">
        <img className="feedback-img" src={FeedbackImage} alt="feedback" />
        <img className="feedback-img" src={FeedbackImageP} alt="feedback" />
      </div>
    </div>
  );
};
