var fs = require("fs");

const datevalidator = (date = "18/12/2018") => {
  try {
    const [day, month, year] = date.split("/");
    if (+day < 32 && +month < 13 && +year > 2000) {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
};

fs.readFile("./chat-files/smaple.txt", "utf8", function (err, data) {
  const lines = data.split("\r\n");
  console.log("lines length", lines.length);

  const chatRecord = {};
  let previousObject = {};
  lines.forEach((line) => {
    try {
      const [date, date_remaining] = line.split(", ");
      const [time, time_remaining] = date_remaining.split(" - ");
      const [senderRaw, message] = time_remaining.split(": ");
      let sender = "Neha";
      if ((senderRaw || "").includes("Hemanth")) {
        sender = "Hemanth";
      }

      if (date && date.length < 12 && datevalidator(date) && time && sender) {
        if (!chatRecord[date]) {
          chatRecord[date] = [{ date, time, sender, message }];
        } else {
          chatRecord[date].push({ date, time, sender, message });
        }
        previousObject = { date, time, sender, message };
      } else {
        throw `${message} has no date `;
      }
    } catch (err) {
      if (previousObject && line) {
        chatRecord[previousObject.date].push({
          ...previousObject,
          message: line,
        });
        // console.log("added", line, "to", previousObject.date);
      }
    }
  });
  fs.writeFileSync("chat.json", JSON.stringify(chatRecord));
});
