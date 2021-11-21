import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function LatestPosts(props) {
  const [data, setData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let tempData = props.latestPostsData.map((post) => {
      let foundImage = post.images.find((image) => {
        return image.type == "cover";
      });
      return { postId: post._id, coverImage: foundImage };
    });
    setData(tempData);
  }, [props.latestPostsData]);

  const handleImage = (postId) => {
    history.push(`/posts/${postId}`);
  };

  return (
    <Container>
      <Type>Latest Posts</Type>
      <PostsContainer>
        {data &&
          data.map((obj, index) => (
            <PostContainer key={index} onClick={() => handleImage(obj.postId)}>
              <img src={obj.coverImage.url} alt="" />
            </PostContainer>
          ))}
      </PostsContainer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts);

const Container = styled.main`
  position: relative;
  margin-top: 70px;
  padding: 10px;
`;

const Type = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const PostsContainer = styled.div`
  padding: 20px;
  overflow: hidden;
  display: grid;
  gap: 35px;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1355px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 812px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PostContainer = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  height: 40vh;
  border-radius: 20px;
  box-shadow: 15px 25px 30px -10px #9ea4ad;
  transition: all 200ms ease-in-out;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &:hover {
    box-shadow: 15px 25px 30px -10px #595c5e;
    transform: scale(1.04);
  }
`;
