import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as XLSX from "xlsx";
import { Button } from "antd";

import { getFileToDownload } from "../../actions/downloadActions";

function DownloadExcelFile({ getFileToDownload, fileToDownload, chosenDates }) {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (fileToDownload && status) {
      setStatus(false);
      downloadExcelFile(fileToDownload, "dashboard_info");
    }
  }, [fileToDownload]);

  const modifyFile = (file, type) => {
    let tempData = [];

    if (type == "cumulative_users" || type == "new_users") {
      file.forEach((item, index) => {
        let tempObj = {
          date: Object.keys(item)[0],
          number_of_users: item[Object.keys(item)[0]],
        };
        tempData.push(tempObj);
      });
    }

    return tempData;
  };

  const downloadFunc = () => {
    setStatus(true);
    getFileToDownload(chosenDates[0], chosenDates[1]);
  };

  const downloadExcelFile = (rawData, dataName) => {
    let files = {
      cumulative_users: modifyFile(
        rawData["finalCumulativeUsers"],
        "cumulative_users"
      ),
      new_users: modifyFile(rawData["finalNewUsers"], "new_users"),
    };
    const newBook = XLSX.utils.book_new();
    Object.keys(files).map((key, index) => {
      XLSX.utils.book_append_sheet(
        newBook,
        XLSX.utils.json_to_sheet(files[key]),
        key
      );
    });

    XLSX.writeFile(newBook, dataName + ".xlsx");
  };
  return (
    <>
      {!status ? (
        <Button type="primary" onClick={() => downloadFunc()}>
          Download
        </Button>
      ) : (
        <Button disabled>Downloading...</Button>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    fileToDownload: state.download.fileToDownload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFileToDownload: (start, end) => dispatch(getFileToDownload(start, end)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadExcelFile);
