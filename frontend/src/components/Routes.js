import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import NavBar from "../components/NavBar";
import PostDetail from "../components/post/PostDetail";
import Posts from "./post/Posts";
import UserContainer from "./data_visualization/user/UserContainer";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          (rest.path == "/login" || rest.path == "/signup") &&
          rest.isAuthenticated
        ) {
          return <Redirect to={{ pathname: "/" }} />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.isAuthenticated && rest.currentUser.isAdmin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const componentsData = [
  { component: Home, path: "/", exact: true, type: "public" },
  { component: Login, path: "/login", exact: true, type: "public" },
  { component: Signup, path: "/signup", exact: true, type: "public" },
  {
    component: PostDetail,
    path: "/posts/:postId",
    exact: true,
    type: "protected",
  },

  { component: Posts, path: "/posts", exact: true, type: "admin" },
  {
    component: UserContainer,
    path: "/datavisualization",
    exact: true,
    type: "admin",
  },
];

export default function Routes(props) {
  return (
    <BrowserRouter>
      <NavBar
        isAuthenticated={props.isAuthenticated}
        currentUser={props.currentUser}
      />
      <Switch>
        <>
          {componentsData.map((item, index) => (
            <div key={index}>
              {item.type == "public" ? (
                <PublicRoute
                  exact={item.exact}
                  path={item.path}
                  component={item.component}
                  isAuthenticated={props.isAuthenticated}
                />
              ) : item.type == "protected" ? (
                <ProtectedRoute
                  exact={item.exact}
                  path={item.path}
                  component={item.component}
                  isAuthenticated={props.isAuthenticated}
                />
              ) : item.type == "admin" && props.currentUser ? (
                <AdminRoute
                  exact={item.exact}
                  path={item.path}
                  component={item.component}
                  isAuthenticated={props.isAuthenticated}
                  currentUser={props.currentUser}
                />
              ) : null}
            </div>
          ))}
        </>
      </Switch>
    </BrowserRouter>
  );
}
