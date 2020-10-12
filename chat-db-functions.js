var makeid = require("./db/utils").makeid;
var { ChatModel, DateListModel } = require("./chat-model");
const UpdateChat = function UpdateChat(data) {
  // find most recent one and update or create new one
  return ChatModel.findOneAndUpdate({ date: data.date }, data, {
    upsert: true,
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
    overwrite: true,
  }).exec();
};
const UpdateDatesArray = function (data) {
  // find most recent one and update or create new one
  console.log("connecting to DB");
  return DateListModel.findOneAndUpdate({ id: data.id }, data, {
    upsert: true,
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
    overwrite: true,
  }).exec();
};

const getChat = function (date) {
  return ChatModel.findOne({ date: date });
};
const getDates = function () {
  return DateListModel.findOne({ id: "date-list-main" });
};

module.exports = {
  UpdateChat: UpdateChat,
  getChat,
  UpdateDatesArray,
  getDates,
};
