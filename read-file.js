var fs = require("fs");
fs.readFile("sample.txt", "utf8", function (err, data) {
  // console.dir(data);
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
      if (senderRaw === "Hemanth") {
        sender = "Hemanth";
      }
      if (!chatRecord[date]) {
        chatRecord[date] = [{ date, time, sender, message }];
      } else {
        chatRecord[date].push({ date, time, sender, message });
      }
      previousObject = { date, time, sender, message };
    } catch (err) {
      //console.error(err);
      if (previousObject && line) {
        chatRecord[previousObject.date] = { ...previousObject, message: line };
        console.log("added", line, "to", previousObject.date);
      }
    }
  });
  fs.writeFileSync("chat-dummy-small.json", JSON.stringify(chatRecord));
});
