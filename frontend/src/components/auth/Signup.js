import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { register } from "../../actions/authActions";
import { auth } from "../../firebase";
import { validateMessages } from "../../constants/index";

const Signup = (props) => {
  const handleSignup = (data) => {
    const { email, password } = data;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        props.register(result.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container>
      <SingupContainer>
        <Form
          name="nest-messages"
          onFinish={handleSignup}
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <LogIn>
          <p>Already have an account?</p>
          <Link to="/login">Log In</Link>
        </LogIn>
      </SingupContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (userInfo) => dispatch(register(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SingupContainer = styled.div`
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

const LogIn = styled.div`
  display: flex;
  flex-direction: row;

  p {
    margin-right: 5px;
  }
`;
