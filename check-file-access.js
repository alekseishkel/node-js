const fs = require('fs');

module.exports.checkAccess = (fileName, errMessage) => {
  try {
    if (fs.existsSync(fileName)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    process.stderr.write(errMessage);
    process.exit(-1);
  }
}