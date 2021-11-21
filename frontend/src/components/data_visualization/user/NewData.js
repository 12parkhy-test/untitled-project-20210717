import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Button } from "antd";
import io from "socket.io-client";
import {
  setChangeStreamSocket,
  changeNewData,
  getNewData,
  resetNewData,
} from "../../../actions/socketActions";

function NewData(props) {
  useEffect(() => {
    props.getNewData();
    const newSocket = io(`/socket/changestream`);
    props.setChangeStreamSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (props.changeStreamSocket) {
      props.changeStreamSocket.on("change_stream", (data) => {
        props.changeNewData(data);
      });
      return () => props.changeStreamSocket.off("change_stream");
    }
  }, [props.changeStreamSocket]);

  const resetNewDataFunc = () => {
    props.resetNewData();
  };

  return (
    <NewDataContainer>
      <SubContainer>
        <Title> New Post Comments:</Title>
        <Content> {props.newData.post_comment.length}</Content>
      </SubContainer>
      <Button onClick={() => resetNewDataFunc()}>Reset New Data</Button>
    </NewDataContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    changeStreamSocket: state.socket.changeStreamSocket,
    newData: state.socket.newData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setChangeStreamSocket: (socket) => dispatch(setChangeStreamSocket(socket)),
    changeNewData: (data) => dispatch(changeNewData(data)),
    getNewData: () => dispatch(getNewData()),
    resetNewData: () => dispatch(resetNewData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewData);

const NewDataContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
`;
const SubContainer = styled.div`
  display: flex;
  font-weight: 800;
  font-size: 20px;
  margin-right: 10px;
`;
const Title = styled.div`
  margin-right: 10px;
`;
const Content = styled.div``;
