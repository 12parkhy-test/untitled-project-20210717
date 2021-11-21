import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import MainTopSlider from "./MainTopSlider";
import LatestPosts from "./post/LatestPosts";
import { getMainTopSlidePosts, getLatestPosts } from "../actions/postActions";

const Home = (props) => {
  const [mainTopSliderData, setMainTopSliderData] = useState([]);
  const [latestPostsData, setLatestPostsData] = useState([]);

  useEffect(() => {
    props.getMainTopSlidePosts();
    props.getLatestPosts();
  }, []);

  useEffect(() => {
    setMainTopSliderData(props.mainTopSlidePosts);
  }, [props.mainTopSlidePosts]);

  useEffect(() => {
    setLatestPostsData(props.latestPosts);
  }, [props.latestPosts]);

  return (
    <Container>
      <MainTopSlider mainTopSliderData={mainTopSliderData} />
      <LatestPosts latestPostsData={latestPostsData} />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,

    mainTopSlidePosts: state.post.mainTopSlidePosts,
    latestPosts: state.post.latestPosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMainTopSlidePosts: () => dispatch(getMainTopSlidePosts()),
    getLatestPosts: () => dispatch(getLatestPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const Container = styled.main`
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  min-height: 100vh;
`;
