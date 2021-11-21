import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Button, Form, Input, message } from "antd";
import {
  addPostComment,
  endAddPostCommentStatus,
} from "../../actions/postActions";

const formItemLayout = {};

function PostCommentForm(props) {
  const [form] = Form.useForm();
  const [uploadingStatus, setUploadingStatus] = React.useState(false);

  const onFinish = (values) => {
    setUploadingStatus(true);
    props.addPostComment({ postId: props.postId, content: values.content });
  };

  useEffect(() => {
    if (props.addPostCommentStatus) {
      message.success("Successfully added a post comment");
      setUploadingStatus(false);
      props.endAddPostCommentStatus();
    }
  }, [props.addPostCommentStatus]);

  return (
    <NewCommentContainer>
      <Header>Add New Comment</Header>
      <Form
        {...formItemLayout}
        form={form}
        name="validate_other"
        onFinish={onFinish}
      >
        <Form.Item name="content">
          <Input.TextArea rows="5" placeholder="Your comment" />
        </Form.Item>

        <Form.Item>
          {!uploadingStatus ? (
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" disabled>
              Adding...
            </Button>
          )}
        </Form.Item>
      </Form>
    </NewCommentContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    addPostCommentStatus: state.post.addPostCommentStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPostComment: (data) => dispatch(addPostComment(data)),
    endAddPostCommentStatus: () => dispatch(endAddPostCommentStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentForm);

const NewCommentContainer = styled.div`
  padding: 20px;
  width: 600px;
  @media (max-width: 812px) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;
