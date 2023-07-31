const fs = require("fs");
const path = require("path");
const { getFilesRecursive } = require("./files");

/**
 * When executed, deletes all empty files and folders in a target directory
 *
 * @param {string} dir the directory to clean sweep
 * @throws error if couldn't complete operation
 */
module.exports.sweep = function (dir) {
  if (!dir) {
    throw new Error("Please specify the target file directory!");
  } else {
    dir = path.normalize(dir);
  }

  return getFilesRecursive(dir, (file) => {
    const fileSize = fs.statSync(file).size;
    console.log(`${file} - ${fileSize} bytes (skipping)`);
    if (fileSize <= 0) {
      // force delete all files and folders
      fs.unlinkSync(file);
      console.log(`\nDeleted ${path.basename(file)} successfully\n`);
    }
  });
};
