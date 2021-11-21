const express = require("express");
const router = express.Router();
const moment = require("moment");
const { authAdmin } = require("../../middleware/index");
const User = require("../../models/User");

router.get("/getfiletodownload/:date", authAdmin, async (req, res, next) => {
  let tempDates = req.params.date.split(":");
  let startDate = new Date(tempDates[0]);
  let endDate = new Date(moment(tempDates[1]).add(1, "days"));
  let endDate2 = new Date(tempDates[1]);

  const getDates = (startData, endData) => {
    let dateObj = {};
    let current = moment(startData);
    let end = moment(endData);
    while (current <= end) {
      dateObj[moment(current).format("YYYY-MM-DD")] = 0;
      current = moment(current).add(1, "days");
    }
    return dateObj;
  };

  let generatedDates = getDates(startDate, endDate2);

  try {
    let usersToCount = await User.aggregate([
      {
        $match: {
          createdAt: { $lt: startDate },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    let initialNumber = 0;
    if (usersToCount.length > 0) {
      initialNumber = usersToCount[0].count;
    }

    let newUsers = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ]);

    newUsers.forEach((item, index) => {
      const { year, month, day } = item._id;
      let tempMonth = month < 10 ? "0" + month : month;
      let tempDay = day < 10 ? "0" + day : day;
      generatedDates[year + "-" + tempMonth + "-" + tempDay] = item.count;
    });

    let finalNewUsers = [];
    let finalCumulativeUsers = [];

    Object.keys(generatedDates).forEach((key, index) => {
      let tempCount =
        index == 0
          ? initialNumber + generatedDates[key]
          : finalCumulativeUsers[index - 1][
              Object.keys(finalCumulativeUsers[index - 1])[0]
            ] + generatedDates[key];

      finalCumulativeUsers[index] = { [key]: tempCount };
      finalNewUsers.push({ [key]: generatedDates[key] });
    });

    res.status(200).json({ finalCumulativeUsers, finalNewUsers });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
