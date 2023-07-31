const fs = require("fs");
const path = require("path");

/**
 * Gets all files in the directory, passing them in a callback
 *
 * @param {string} dir the directory to retrieve files from
 * @param {Function} callbackfn action to be performed on each file in directory
 */
module.exports.getFilesRecursive = function (dir, callbackfn) {
  const files = fs.readdirSync(dir, { recursive: true });

  files.forEach((file) => {
    const absoluteFile = path.join(dir, file);
    const isFile = fs.statSync(absoluteFile).isFile();

    isFile
      ? callbackfn(absoluteFile)
      : getFilesRecursive(absoluteFile, callbackfn);
  });
};
