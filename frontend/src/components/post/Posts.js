import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PostForm from "./PostForm";

const Posts = (props) => {
  return (
    <Container>
      <PostForm formType={"add"} />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

const Container = styled.div`
  margin-top: 100px;
  margin-left: 10px;
`;
