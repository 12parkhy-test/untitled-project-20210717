export const convertToReadableDate = (type, data) => {
  let monthObj = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const temp1 = new Date(data).toString();

  const temp2 = temp1.split(" ");
  let extra = "";
  let temp3;
  if (type == 0) {
    extra = "/" + temp2[4];
    temp3 = temp2[3] + "/" + monthObj[temp2[1]] + "/" + temp2[2] + extra;
  } else if (type == 1) {
    extra = "-" + temp2[4];
    temp3 = temp2[3] + "-" + monthObj[temp2[1]] + "-" + temp2[2] + extra;
  } else if (type == 2) {
    temp3 = temp2[3] + "/" + monthObj[temp2[1]] + "/" + temp2[2] + extra;
  }

  return temp3;
};
