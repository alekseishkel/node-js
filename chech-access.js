const fs = require('fs');

module.exports.checkAccess = (fileName) => {
  try {
    if (fs.existsSync(fileName)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}