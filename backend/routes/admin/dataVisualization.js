const express = require("express");
const router = express.Router();
const moment = require("moment");
const { authAdmin } = require("../../middleware/index");
const User = require("../../models/User");
const ChangeStreamDoc = require("../../models/ChangeStreamDoc");

router.get(
  "/getdailynewuserswithdate/:date",
  authAdmin,
  async (req, res, next) => {
    let tempDates = req.params.date.split(":");
    let startDate = new Date(tempDates[0]);
    let endDate = new Date(moment(tempDates[1]).add(1, "days"));

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

    let generatedDates = getDates(startDate, endDate);

    try {
      let newUsers = await User.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lt: endDate },
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

      newUsers.forEach((item) => {
        const { year, month, day } = item._id;
        let tempMonth = month < 10 ? "0" + month : month;
        let tempDay = day < 10 ? "0" + day : day;
        generatedDates[year + "-" + tempMonth + "-" + tempDay] = item.count;
      });

      let newUsersDates = [];
      let modifiedNewUsers = Object.keys(generatedDates).map((key, index) => {
        newUsersDates.push(key);
        return generatedDates[key];
      });

      res.status(200).json({ modifiedNewUsers, newUsersDates });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
);

router.get(
  "/getcumulativeuserswithdate/:date",
  authAdmin,
  async (req, res, next) => {
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
      let cumulativeUsers = [];
      let cumulativeUsersDates = [];
      Object.keys(generatedDates).forEach((key, index) => {
        let tempCount =
          index == 0
            ? initialNumber + generatedDates[key]
            : cumulativeUsers[index - 1] + generatedDates[key];

        cumulativeUsers[index] = tempCount;
        cumulativeUsersDates.push(key);
      });

      res.status(200).json({ cumulativeUsers, cumulativeUsersDates });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
);

router.get("/getnewdata", authAdmin, async (req, res, next) => {
  try {
    console.log("getnewdata");
    let changeStreamDocs = await ChangeStreamDoc.aggregate([
      { $project: { item_type: 1, item_id: 1 } },
      {
        $group: {
          _id: "$item_type",
          data: { $push: "$item_id" },
        },
      },
    ]);

    let final = { post_comment: [], user: [] };
    changeStreamDocs.forEach((item) => {
      final[item._id] = item.data;
    });

    res.status(200).json(final);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.delete("/resetnewdata", authAdmin, async (req, res, next) => {
  try {
    await ChangeStreamDoc.deleteMany({});

    let final = { post_comment: [], user: [] };

    res.status(200).json(final);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
