import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Input, Switch, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addPost, endAddPostStatus } from "../../actions/postActions";
import ProgressBars from "./ProgressBars";
import { convertToReadableDate } from "../../functions/index";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 15,
  },
};

const PostForm = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [uploadingStatus, setUploadingStatus] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onFinish = (values) => {
    setUploadingStatus(true);
    const { coverImage, detailImages, ...rest } = values;
    if (
      (coverImage && coverImage.length > 0) ||
      (detailImages && detailImages.length > 0)
    ) {
      // image exists
      let images = [];
      if (coverImage && coverImage.length > 0) {
        images.push({ image: coverImage[0], type: "cover" });
      }
      if (detailImages && detailImages.length > 0) {
        detailImages.forEach((item) => {
          images.push({ image: item, type: "general" });
        });
      }

      setData({
        ...rest,
        images,
        date: convertToReadableDate(1, new Date()),
      });
    } else {
      // image doesnt exist
      props.addPost({ ...rest, images: null });
    }
  };

  useEffect(() => {
    if (props.addPostStatus) {
      message.success("Successfully added a post.");
      setVisible(false);
      setData(null);
      setUploadingStatus(false);
      form.resetFields();
      props.endAddPostStatus();
    }
  }, [props.addPostStatus]);

  return (
    <>
      <Button onClick={showModal}>
        {props.formType == "add" ? "Add Post" : null}
      </Button>
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
            <Form.Item
              name="mainTopSlide"
              label="Main Top Slide"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item name="title" label="Title">
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item name="content" label="Content">
              <Input.TextArea rows="10" placeholder="Content" />
            </Form.Item>
            <Form.Item
              name="coverImage"
              label="Cover Image"
              getValueFromEvent={normFile}
            >
              <Upload maxCount={1} listType="picture">
                <Button icon={<UploadOutlined />}>Add Cover Image</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="detailImages"
              label="Detail Images"
              getValueFromEvent={normFile}
            >
              <Upload listType="picture">
                <Button icon={<UploadOutlined />}>Add Detail Image</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
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
            {data ? (
              <ProgressBars data={data} formType={props.formType} />
            ) : null}
          </Form>
        </>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    addPostStatus: state.post.addPostStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    endAddPostStatus: () => dispatch(endAddPostStatus()),
    addPost: (post) => dispatch(addPost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
