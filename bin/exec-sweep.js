#!/usr/bin/env node
const cleanSweep = require("../lib/sweep");
let fileDirectory = process.argv[2];
const VALID_PARAMS = ["-v"];
let params = process.argv.slice(3, process.argv.length);

if (!fileDirectory) {
  return console.error(
    "Please specify the target file directory!" +
      "\n\n" +
      "Usage: clean-sweep <directory> -v | csw <directory> -v" +
      "\n\n" +
      "Parameters:" +
      " \n\n" +
      " -v: Prints operation to console"
  );
} else if (!params.every((param) => VALID_PARAMS.includes(param))) {
  return console.error(
    "Invalid parameter!" +
      "\n\n" +
      "Valid parameters:" +
      " \n\n" +
      " -v: Prints operation to console"
  );
} else {
  try {
    if (params.includes("-v")) {
      cleanSweep.sweep(fileDirectory, { verbose: true });
    } else {
      cleanSweep.sweep(fileDirectory);
    }
  } catch (err) {
    if (err.code == "ENOENT") {
      console.error(`Directory "${fileDirectory}" does not exist`);
    } else {
      console.error(err.message);
    }
  }
}
