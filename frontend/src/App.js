import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, Provider, connect } from "react-redux";
import Routes from "./components/Routes";
import { auth } from "../src/firebase";
import { getUser } from "../src/actions/userActions";
import { loadUser } from "../src/actions/authActions";

import "antd/dist/antd.css";

const App = (props) => {
  const [status, setStatus] = useState({
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setStatus({
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setStatus({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (props.token) {
      dispatch(loadUser());
    }
  }, [props.token]);

  if (status.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes
        isAuthenticated={status.isAuthenticated}
        currentUser={props.user}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
