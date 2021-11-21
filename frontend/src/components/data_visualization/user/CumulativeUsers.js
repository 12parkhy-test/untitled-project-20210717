import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CumulativeUsers = (props) => {
  const [options, setOptions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.cumulativeUsersWithDate.data.length > 0) {
      const config = {
        credits: {
          enabled: false,
        },
        title: {
          text: "Cumulative Users",
        },
        xAxis: {
          tickInterval: 2,
          categories: props.cumulativeUsersWithDate.dates,
        },
        yAxis: { title: { text: "A Number of Users" } },
        legend: {
          enabled: false,
        },
        series: [
          {
            type: "area",
            name: "Cumulative Users",
            data: props.cumulativeUsersWithDate.data,
          },
        ],
      };
      setOptions(config);
    } else {
      setOptions(null);
    }
  }, [props.cumulativeUsersWithDate]);

  return (
    <>
      {options && <HighchartsReact highcharts={Highcharts} options={options} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cumulativeUsersWithDate: state.user.cumulativeUsersWithDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CumulativeUsers);
