#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

let fileDirectory = process.argv[2];

if (!fileDirectory) {
  console.log("Please specify the target file directory");
  return;
} else {
  fileDirectory = path.normalize(fileDirectory);
}

getFilesRecursive(fileDirectory, (file) => {
  try {
    const fileSize = fs.statSync(file).size;
    console.log(`${file} - ${fileSize} bytes (skipping)`);
    if (fileSize <= 0) {
      // force delete all files and folders
      fs.unlinkSync(file);
      console.log(`\nDeleted ${path.basename(file)} successfully\n`);
    }
  } catch (err) {
    console.error("\n\nError occurred: Cause - " + err.message + "\n\n");
  }
});

function getFilesRecursive(dir, callback) {
  try {
    const files = fs.readdirSync(dir, { recursive: true });

    files.map((file) => {
      const absoluteFile = path.join(dir, file);
      const isFile = fs.statSync(absoluteFile).isFile();

      isFile
        ? callback(absoluteFile)
        : getFilesRecursive(absoluteFile, callback);
    });
  } catch (err) {
    if (err.code == "ENOENT") {
      console.error("Directory does not exist");
    } else {
      console.error("\n\nError occurred: Cause - " + err.message + "\n\n");
    }
  }
}
