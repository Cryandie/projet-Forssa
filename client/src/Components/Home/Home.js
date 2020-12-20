import React, { useState } from "react";
import "./home.css";
import { HomeFooter } from "./HomeFooter";
import EveryoneImage from "../../Assets/EveryoneImage.png";
import AutonomyImage from "../../Assets/AutonomyImage.png";
import TogetherImage from "../../Assets/TogetherImage.png";
import { NavLink } from "react-router-dom";
import { login } from "../../actions/auth";
import HomeLogged from "./HomeLogged";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Home = ({ login, isAuthenticated }) => {
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
  if (!isAuthenticated) {
    return (
      <div className="home">
        <div className="container grid">
          <div className="text">
            <h2>Pourquoi utiliser Forssa?</h2>
            <p>
              Forssa est une forme de marché virtuel qui vise à rapprocher et
              faciliter l'échange entre les prestataires de services et leurs
              clients, en quelques clics on arrive à trouver le prestataire dont
              on a besoin , ses horaires et ses moyens de contact. Ceci facilite
              aussi l'accès à l'emploi pendant cette période difficile , vous
              pouvez créer un profil en quelques minutes et l'avoir affiché pour
              toute personne intéressée par le service que vous provoposez.
            </p>
            <button type="button">Savoir plus</button>
          </div>
          <div className="identification">
            <div className="logincontainer">
              <form className="login" onSubmit={(e) => onSubmit(e)}>
                <h4>Vous avez déjà un compte ?</h4>
                <input
                  value={email}
                  onChange={(e) => onChange(e)}
                  name="email"
                  type="email"
                  placeholder="Votre adresse mail"
                  required
                />
                <input
                  value={password}
                  onChange={(e) => onChange(e)}
                  name="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  required
                />
                <br />

                <button type="submit"> Identifiez-vous </button>
              </form>
            </div>
            <div className="Registration">
              <form className="register">
                <h4 className="newmember">
                  Vous n'avez pas encore de compte ?
                </h4>
                <NavLink to="/register">
                  <button type="button"> Créez un compte</button>
                </NavLink>
              </form>
            </div>
            <div className="homeimages">
              <div className="everyonedaddy">
                <h5>Accessible n'importe où, à n'importe qui! </h5>
                <img className="everyone" src={EveryoneImage} alt="everyone" />
                <p>
                  Où que vous soyez, en utilisant Forssa vous avez la
                  possibilité de travailler et de montrer vos compétences à tout
                  le monde, pas besoin de CV ou d'entretien, chacun de nous
                  pourrait rendre service aux autres, tout ce qu'il vous faut
                  c'est une connexion internet!
                </p>
              </div>
              <div className="autonomydaddy">
                <h5>
                  Flexibilité <br /> et autonomie
                </h5>
                <img className="autonome" src={AutonomyImage} alt="autonome" />
                <p>
                  Ne laissez pas des évennements tel que le COVID freiner votre
                  revenu ! Devenez autonome , vous avez besoin de vos
                  compétences et de personne d'autre pour travailler!
                </p>
              </div>
              <div className="autonomydaddy">
                <h5>Accessible à n'importe qui, n'importe où!</h5>
                <img className="autonome" src={TogetherImage} alt="autonome" />
                <p>
                  Ne laissez pas des évennements tel que le COVID freiner votre
                  revenu ! Devenez autonome , vous avez besoin de vos
                  compétences et de personne d'autre pour travailler!
                </p>
              </div>
              <div className="autonomydaddy">
                <h5>Accessible à n'importe qui, n'importe où!</h5>
                <img className="autonome" src={AutonomyImage} alt="autonome" />
                <p>
                  Ne laissez pas des évennements tel que le COVID freiner votre
                  revenu ! Devenez autonome , vous avez besoin de vos
                  compétences et de personne d'autre pour travailler!
                </p>
              </div>
              <div className="homefooter">
                <HomeFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //UI when user Logged in
  else return <HomeLogged />;
};

Home.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Home);
