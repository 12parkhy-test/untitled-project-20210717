import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PostCommentForm from "./PostCommentForm";
import PostComments from "./PostComments";
import { getPost } from "../../actions/postActions";

const imageStyle = {
  height: "40vh",
  width: "100%",
  objectFit: "cover",
};

const PostDetail = (props) => {
  const { postId } = useParams();
  const [coverImage, setCoverImage] = useState(null);
  const [detailImages, setDetailImages] = useState([]);
  const [postCommentsData, setPostCommentsData] = useState([]);

  useEffect(() => {
    setCoverImage(null);
    setDetailImages([]);
    props.getPost(postId);
  }, []);

  useEffect(() => {
    let tempObj = null;
    let tempArr = [];
    if (props.post.images) {
      props.post.images.forEach((image) => {
        if (image.type == "cover") {
          tempObj = image;
        } else if (image.type == "general") {
          tempArr.push(image);
        }
      });
    }
    setCoverImage(tempObj);
    setDetailImages(tempArr);
    if (props.post.comments) {
      setPostCommentsData(props.post.comments);
    }
  }, [props.post]);

  return (
    <Container>
      {coverImage && <img src={coverImage.url} alt="" style={imageStyle} />}
      <PostInfo>
        <Title>{props.post.title}</Title>
        <Content>{props.post.content}</Content>
      </PostInfo>
      <DetailImagesContainer>
        {detailImages.map((image, index) => (
          <DetailImageContainer key={index}>
            <img src={image.url} alt="" />
          </DetailImageContainer>
        ))}
      </DetailImagesContainer>
      <PostCommentContainer>
        <PostCommentForm postId={postId} />
        <PostComments postId={postId} postCommentsData={postCommentsData} />
      </PostCommentContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { post: state.post.post };
};

const mapDispatchToProps = (dispatch) => {
  return { getPost: (id) => dispatch(getPost(id)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

const Container = styled.main`
  position: relative;
  margin-top: 70px;
  min-height: 100vh;
`;

const PostInfo = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

const Content = styled.div`
  font-size: 15px;
`;

const DetailImagesContainer = styled.div`
  padding: 20px;
  overflow: hidden;
  display: grid;
  gap: 35px;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 812px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const DetailImageContainer = styled.div`
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

const PostCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
