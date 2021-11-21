import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Form, DatePicker, Button } from "antd";
import moment from "moment";

import {
  getDailyNewUsersWithDate,
  getCumulativeUsersWithDate,
} from "../../../actions/userActions";

import DailyNewUsers from "./DailyNewUsers";
import CumulativeUsers from "./CumulativeUsers";
import DownloadExcelFile from "../../download/DownloadExcelFile";
import NewData from "./NewData";

const { RangePicker } = DatePicker;

const UserContainer = (props) => {
  const [chosenDates, setChosenDates] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const start = moment(new Date(2021, 7, 15));
    const end = moment(new Date());

    props.getDailyNewUsersWithDate(
      start.format("YYYY-MM-DD"),
      end.format("YYYY-MM-DD")
    );
    props.getCumulativeUsersWithDate(
      start.format("YYYY-MM-DD"),
      end.format("YYYY-MM-DD")
    );
    form.setFieldsValue({
      "range-picker": [start, end],
    });
    setChosenDates([start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")]);
  }, []);

  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please, choose start and end dates",
      },
    ],
  };

  const onFinish = (fieldsValue) => {
    props.getDailyNewUsersWithDate(
      fieldsValue["range-picker"][0].format("YYYY-MM-DD"),
      fieldsValue["range-picker"][1].format("YYYY-MM-DD")
    );
    props.getCumulativeUsersWithDate(
      fieldsValue["range-picker"][0].format("YYYY-MM-DD"),
      fieldsValue["range-picker"][1].format("YYYY-MM-DD")
    );
    setChosenDates([
      fieldsValue["range-picker"][0].format("YYYY-MM-DD"),
      fieldsValue["range-picker"][1].format("YYYY-MM-DD"),
    ]);
  };

  return (
    <UserDataVisualiztionContainer>
      <NewData />
      <SubContainer>
        <Form
          className="dateContainer"
          name="time_related_controls"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item name="range-picker" {...rangeConfig}>
            <RangePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Go
            </Button>
          </Form.Item>
        </Form>
        {chosenDates && <DownloadExcelFile chosenDates={chosenDates} />}
      </SubContainer>
      <div className="gridContainer">
        <DailyNewUsers />
        <CumulativeUsers />
      </div>
    </UserDataVisualiztionContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    dailyNewUsersWithDate: state.user.dailyNewUsersWithDate,
    cumulativeUsersWithDate: state.user.cumulativeUsersWithDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDailyNewUsersWithDate: (start, end) =>
      dispatch(getDailyNewUsersWithDate(start, end)),
    getCumulativeUsersWithDate: (start, end) =>
      dispatch(getCumulativeUsersWithDate(start, end)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);

const UserDataVisualiztionContainer = styled.div`
  margin-top: 100px;
  margin-left: 10px;
  margin-right: 10px;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .dateContainer {
    display: flex;
  }
`;
