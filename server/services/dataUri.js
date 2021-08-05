const path = require('path');
const Datauri = require('datauri');
const dUri = new Datauri();

exports.dataUri = function (file) {
  return dUri.format(path.extname(file.originalname).toString(), file.buffer);
};
