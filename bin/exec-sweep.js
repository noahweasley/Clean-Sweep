#!/usr/bin/env node
const cleanSweep = require("../lib/sweep");
let fileDirectory = process.argv[2];

if (!fileDirectory) {
  return console.error(
    "Please specify the target file directory!\n\nUsage: clean-sweep <directory> | csw <directory>"
  );
} else {
  try {
    cleanSweep.sweep(fileDirectory);
  } catch (err) {
    if (err.code == "ENOENT") {
      console.error("Directory does not exist");
    } else {
      console.error(err.message);
    }
  }
}
