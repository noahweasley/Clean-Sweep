const fs = require("fs/promises");
const path = require("path");

/**
 * When executed, deletes all files with same size as `param.threshHold`, in a target directory
 *
 * @param {string} dir the directory to clean sweep
 * @param {JSON} params  the additional optional parameters. Valid params are: (verbose, threshHold).
 * @throws error if couldn't complete operation
 */
module.exports.sweep = async function (dir, params) {
  if (!dir) {
    throw new Error("Please specify the target file directory!");
  } else {
    dir = path.normalize(dir);
  }

  return getFilesRecursive(dir, async (file) => {
    const fileSize = (await fs.stat(file)).size;
    const maxFileSize = params.threshHold | 0;

    if (params && params.verbose && fileSize <= maxFileSize) {
      // eslint-disable-next-line no-console
      console.log(`${file} - ${fileSize} bytes (Deleting)`);
    } else if (params && params.verbose) {
      // eslint-disable-next-line no-console
      console.log(`${file} - ${fileSize} bytes (Skipping)`);
    }

    if (fileSize <= maxFileSize) {
      // force delete all files
      await fs.unlink(file);
      if (params && params.verbose) {
        // eslint-disable-next-line no-console
        console.log(`\nDeleted ${path.basename(file)} successfully\n`);
      }
    }
  });
};

/**
 * Gets all files in the directory, passing them in a callback
 *
 * @param {string} dir the directory to retrieve files from
 * @param {Function} callbackfn action to be performed on each file in directory
 */
async function getFilesRecursive(dir, callbackfn) {
  const files = await fs.readdir(dir, { recursive: true });
  files.forEach(async (file) => {
    const absoluteFile = path.join(dir, file);
    const isFile = (await fs.stat(absoluteFile)).isFile();

    isFile ? callbackfn(absoluteFile) : getFilesRecursive(absoluteFile, callbackfn);
  });
}
