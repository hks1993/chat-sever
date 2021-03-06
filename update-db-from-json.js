const chatJson = require("./chat.json");
const MongoFunctions = require("./chat-db-functions");
async function updateChatsScript(chat) {
  try {
    const promiseArray = Object.keys(chat).map((key) => {
      const chatModelObject = {
        date: key,
        messageArray: chat[key],
      };
      return MongoFunctions.UpdateChat(chatModelObject);
    });
    const dateBaseUpdate = await Promise.all(promiseArray);
    console.log("success -database updated");
  } catch (err) {
    console.error("failed", err);
  }
}
async function updateDatesScript(chat) {
  console.log("script started");
  try {
    console.log("step 1  ");
    const chatModelObject = {
      id: "date-list-main",
      datesArray: Object.keys(chat) || [],
    };
    console.log("step 2");
    const result = await MongoFunctions.UpdateDatesArray(chatModelObject);
    console.log("success", result);
  } catch (err) {
    console.error("failed", err);
  }
}
updateChatsScript(chatJson);
updateDatesScript(chatJson);
