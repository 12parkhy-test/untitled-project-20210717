import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Comment, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  deletePostComment,
  endDeletePostCommentStatus,
} from "../../actions/postActions";
import EditPostComment from "./EditPostComment";

function PostComments(props) {
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    setPostComments(props.postCommentsData);
  }, [props.postCommentsData]);

  useEffect(() => {
    if (props.deletePostCommentStatus) {
      message.success("Successfully deleted a post comment");
      props.endDeletePostCommentStatus();
    }
  }, [props.deletePostCommentStatus]);

  const confirm = (commentId) => {
    props.deletePostComment({ postId: props.postId, commentId });
  };

  const cancel = () => {};

  return (
    <PostCommentsContainer>
      <Header>{postComments.length} Comments</Header>

      {postComments.map((comment, index) => (
        <div key={index}>
          <Comment
            author={<>{comment.user.email}</>}
            content={<p>{comment.content}</p>}
            datetime={<span>{comment.createdAt}</span>}
          />
          <ModifyCommentContainer>
            {props.user.uid == comment.user.uid ? (
              <>
                <EditPostComment postId={props.postId} comment={comment} />
                <Popconfirm
                  title="Do you want to delete this post comment?"
                  onConfirm={() => confirm(comment._id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined />
                </Popconfirm>
              </>
            ) : null}
          </ModifyCommentContainer>
        </div>
      ))}
    </PostCommentsContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    deletePostCommentStatus: state.post.deletePostCommentStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePostComment: (data) => dispatch(deletePostComment(data)),
    endDeletePostCommentStatus: () => dispatch(endDeletePostCommentStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComments);

const PostCommentsContainer = styled.div`
  padding: 20px;
  width: 600px;
  @media (max-width: 812px) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-weight: bold;
`;

const ModifyCommentContainer = styled.div`
  width: 40px;
  display: flex;
  justify-content: space-between;
`;
