function makeid(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var idLength = parseInt(length) || 10;

  for (var i = 0; i < idLength; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function dedupeIDs(objectIDs) {
  const ids = {};
  objectIDs.forEach(_id => (ids[_id.toString()] = _id));
  return Object.values(ids);
}
module.exports = {
  makeid: makeid,
  dedupeIDs: dedupeIDs
};
