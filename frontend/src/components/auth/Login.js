import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { Button, Divider, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { login } from "../../actions/authActions";
import { auth, provider } from "../../firebase";
import { validateMessages } from "../../constants/index";

const Login = (props) => {
  const handleLogin = (type, data) => {
    if (type == "email") {
      const { email, password } = data;
      auth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          props.login({ userInfo: result.user, type });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const onFinish = (values) => {
    handleLogin("email", values);
  };

  return (
    <Container>
      <LoginContainer>
        <Form
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login With Email
            </Button>
          </Form.Item>
        </Form>
        <SignUp>
          <p>Don't have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </SignUp>
      </LoginContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
  }

  button {
    width: 100%;
  }

  @media (max-width: 320px) {
    min-width: 250px;
  }
`;

const SignUp = styled.div`
  display: flex;
  flex-direction: row;

  p {
    margin-right: 5px;
  }
`;
