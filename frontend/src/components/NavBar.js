import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { auth } from "../firebase";
import { logOut } from "../actions/authActions";

function MenuComponent(props) {
  return (
    <Menu>
      {props.currentUser && props.currentUser.isAdmin ? (
        <>
          <Menu.Item key="0">
            <Link to="/posts">Add Post</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/datavisualization">Dashboard</Link>
          </Menu.Item>
          <Menu.Divider />
        </>
      ) : null}
      <Menu.Item key="3">
        <Link onClick={props.handleLogout} className="nav-item logout">
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );
}

const NavBar = (props) => {
  const history = useHistory();
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        history.push("/");
        props.logOut();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Nav>
      <Link to="/" className="nav-item logo">
        Logo
      </Link>

      {!props.isAuthenticated ? (
        <Link to="/login" className="nav-item login">
          Login
        </Link>
      ) : (
        <>
          <SubNav>
            <div
              className={`big-display ${
                props.currentUser && props.currentUser.isAdmin
                  ? "admin"
                  : "non-admin"
              }`}
            >
              {props.currentUser && props.currentUser.isAdmin ? (
                <>
                  <Link to="/posts" className="nav-item addpost">
                    Add Post
                  </Link>
                  <Link
                    to="/datavisualization"
                    className="nav-item datavisualization"
                  >
                    Dashboard
                  </Link>
                </>
              ) : null}
              <Link onClick={handleLogout} className={`nav-item logout`}>
                Logout
              </Link>
            </div>
            <div className="small-display">
              <Dropdown
                overlay={
                  <MenuComponent
                    currentUser={props.currentUser}
                    handleLogout={handleLogout}
                  />
                }
                trigger={["click"]}
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <UserOutlined className="nav-item user-icon" />
                </a>
              </Dropdown>
            </div>
          </SubNav>
        </>
      )}
    </Nav>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #1fa191;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
  z-index: 1;

  .nav-item {
    color: white;
    font-size: 20px;
    letter-spacing: 1.5px;
  }
`;

const SubNav = styled.div`
  margin-left: auto;

  @media (min-width: 812px) {
    .big-display {
      width: 300px;
      display: flex;
    }
    .admin {
      justify-content: space-between;
    }
    .non-admin {
      justify-content: flex-end;
    }
    .small-display {
      display: none;
    }
  }

  @media (max-width: 812px) {
    .big-display {
      display: none;
    }
  }
`;
