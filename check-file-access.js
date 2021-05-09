const fs = require('fs');

module.exports.checkAccess = (fileName, errMessage) => {
  try {
    if (fileName === undefined) {
      return false;
    } else if (fs.existsSync(fileName)) {
      return true;
    } else {
      process.stderr.write(errMessage);
      process.exit(-1);
    }
  } catch (err) {
    process.stderr.write(errMessage);
    process.exit(-1);
  }
}