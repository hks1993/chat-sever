const chats = require("../chat-db-functions");

// updateWidgetDataBlueprint();
module.exports = {
  init: function (appWithoutAuth) {
    // @description: Get a widget by its ID
    appWithoutAuth.get("/chats/:date", function (req, res) {
      chats
        .getChat(req.params.date)
        .then((data) => {
          if (data == null) {
            res.status(404).send({ error: true, message: "Widget Not Found" });
            return;
          }

          const widgetObj = data.toObject();

          res.json(widgetObj);
          return;
        })
        .catch((e) => {
          console.error("WidgetGet Error", e);
          res.status(500).send({ error: true, message: "Error unknown" });
          return;
        });
    });
    appWithoutAuth.get("/dates", function (req, res) {
      chats
        .getDates()
        .then((data) => {
          if (data == null) {
            res.status(404).send({ error: true, message: "Widget Not Found" });
            return;
          }

          const widgetObj = data.toObject();

          res.json(widgetObj);
          return;
        })
        .catch((e) => {
          console.error("WidgetGet Error", e);
          res.status(500).send({ error: true, message: "Error unknown" });
          return;
        });
    });
  },
};
