import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DailyNewUsers = (props) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (props.dailyNewUsersWithDate.data.length > 0) {
      const config = {
        credits: {
          enabled: false,
        },
        title: {
          text: "Daily New Users",
        },
        xAxis: {
          tickInterval: 2,
          categories: props.dailyNewUsersWithDate.dates,
        },
        yAxis: { title: { text: "A Number of New Users" } },
        legend: {
          enabled: false,
        },
        series: [
          {
            type: "area",
            name: "New Users",
            data: props.dailyNewUsersWithDate.data,
          },
        ],
      };
      setOptions(config);
    } else {
      setOptions(null);
    }
  }, [props.dailyNewUsersWithDate]);

  return (
    <>
      {options && <HighchartsReact highcharts={Highcharts} options={options} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dailyNewUsersWithDate: state.user.dailyNewUsersWithDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyNewUsers);
