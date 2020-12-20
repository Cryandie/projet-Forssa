import "./App.css";
import React, { useEffect } from "react";
import MainNavbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Register from "./Components/Auth/Register";
import Profiles from "./Components/profiles/Profiles";
import PublicProfile from "./Components/Profile/PublicProfile";
import EditProfile from "./Components/Profile/EditProfile";
import { loadUser } from "./actions/auth";
import Alert from "./Components/Layout/Alert";
import setAuthToken from "./utility/setAuthToken";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./Components/Auth/Login";
import { LOGOUT } from "./actions/types";
import PrivateRoutes from "./utility/PrivateRoutes";
const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <MainNavbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profiles" component={Profiles} />
          <PrivateRoutes exact path="/profile" component={Profile} />
          <PrivateRoutes exact path="/editprofile" component={EditProfile} />
          <PrivateRoutes exact path="/profile/user/:profileid" component={PublicProfile} />
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
