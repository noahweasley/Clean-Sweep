/* eslint-disable no-console */
//#!/usr/bin/env node
const path = require("path");
const cleanSweep = require("../lib/sweep");
const prompt = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const argv2 = process.argv[2];
const NO_ARG_PARAMS = ["-v"];
const ARG_PARAMS = ["-t"];
const params = process.argv.slice(3, process.argv.length);
const paramMap = {};

for (let i = 0; i < params.length; i++) {
  if (NO_ARG_PARAMS.includes(params[i])) {
    paramMap[params[i]] = null;
  } else if (ARG_PARAMS.includes(params[i])) {
    paramMap[params[i]] = params[i++ + 1];
  } else {
    prompt.close();
    if (params.includes("-h")) {
      console.info("Please use csw -h or clean-sweep -h to display command usage");
    } else {
      console.error(
        "Invalid parameter!" +
          "\n\n" +
          "Valid parameters:" +
          " \n\n" +
          " -v: Prints operation to console" +
          " \n\n" +
          " -t: Specifies file size threshold" +
          " \n\n" +
          " -h: Shows command usage"
      );
    }
    prompt.close();
    process.exit(1);
  }
}

if (!argv2 || argv2 === "-h") {
  prompt.close();
  return console.info(
    "Usage: clean-sweep <directory> -v -t <bytes> | csw <directory> -v -t <bytes> | csw -h | clean-sweep -h" +
      "\n\n" +
      "Parameters:" +
      " \n\n" +
      " -v: Prints operation to console" +
      " \n\n" +
      " -t: Specify file size threshold" +
      " \n\n" +
      " -h: Shows command usage"
  );
} else {
  try {
    const threshHold = paramMap["-t"] | 0;
    const question = `Delete all files <= ${threshHold}B in "${path.resolve(argv2)}"?\nYes or No: `;

    prompt.question(question, function (answer) {
      if (["yes", "y"].includes(answer.toLowerCase())) {
        const params = Object.keys(paramMap);
        const verbose = params.includes("-v");

        cleanSweep.sweepSync(argv2, { verbose, threshHold });

        prompt.close();
      } else {
        prompt.close();
        return;
      }
    });
  } catch (err) {
    prompt.close();
    if (err.code === "ENOENT") {
      console.error(`Directory "${argv2}" does not exist`);
    } else {
      console.error(err.message);
    }
  }
}
