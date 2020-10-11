var mongoose = require("mongoose");
const { string } = require("yargs");
var db = require("./db").db;
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var DayChatSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    messageArray: {
      type: Array,
    },
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
  }
);

DayChatSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

var DateListSchema = new Schema(
  {
    id: { type: String, required: true, default: "date-list-main" },
    datesArray: {
      type: Array,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
  }
);

DayChatSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});
DateListSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});
var ChatModel = mongoose.model("day-wise-chat", DayChatSchema);
var DateListModel = mongoose.model("dates-list", DateListSchema);

module.exports = {
  ChatModel: ChatModel,
  DateListModel: DateListModel,
};
