import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Modal, Button, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  editPostComment,
  endEditPostCommentStatus,
} from "../../actions/postActions";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 15,
  },
};

function EditPostComment(props) {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [uploadingStatus, setUploadingStatus] = React.useState(false);

  const showModal = () => {
    form.setFieldsValue({ content: props.comment.content });
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    setUploadingStatus(true);
    props.editPostComment({
      postId: props.postId,
      commentId: props.comment._id,
      content: values.content,
    });
  };

  useEffect(() => {
    if (props.editPostCommentStatus && visible) {
      message.success("Successfully edited a post comment");
      setVisible(false);
      form.resetFields();
      setUploadingStatus(false);
      props.endEditPostCommentStatus();
    }
  }, [props.editPostCommentStatus]);

  return (
    <>
      <EditOutlined onClick={showModal} />
      <Modal visible={visible} onCancel={handleCancel} footer={null}>
        <>
          <Form
            {...formItemLayout}
            form={form}
            style={{
              marginTop: "10%",
            }}
            name="validate_other"
            onFinish={onFinish}
          >
            <Form.Item name="content" label="Content">
              <Input.TextArea rows="10" placeholder="Content" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              {!uploadingStatus ? (
                <Button type="primary" htmlType="submit">
                  Edit
                </Button>
              ) : (
                <Button type="primary" htmlType="submit" disabled>
                  Editing...
                </Button>
              )}
            </Form.Item>
          </Form>
        </>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return { editPostCommentStatus: state.post.editPostCommentStatus };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPostComment: (data) => dispatch(editPostComment(data)),
    endEditPostCommentStatus: () => dispatch(endEditPostCommentStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostComment);
