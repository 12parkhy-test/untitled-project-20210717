import React, { useEffect, useState } from "react";
import useStoragePost from "../../hooks/useStoragePost";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";

function ProgressBars({ data, formType, user, addPost }) {
  const { progressObj, imageObjArr, foundError } = useStoragePost(
    data.images,
    user,
    data.date
  );
  useEffect(() => {
    if (imageObjArr) {
      const { images, ...rest } = data;
      addPost({
        ...rest,
        images: imageObjArr,
      });
    }
  }, [imageObjArr]);

  return (
    <>
      {progressObj &&
        Object.keys(progressObj).map((key, index) => (
          <div key={index}>
            <p>{key}</p>
            <p>{progressObj[key]}%</p>
            <div
              style={{
                width: progressObj[key] + "%",
                height: "5px",
                background: "#5294ff",
              }}
            ></div>
          </div>
        ))}
      {foundError && foundError}
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(addPost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBars);
