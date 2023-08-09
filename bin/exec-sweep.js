#!/usr/bin/env node
const path = require("path");
const cleanSweep = require("../lib/sweep");
const prompt = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let argv2 = process.argv[2];
const VALID_PARAMS = ["-v"];
let params = process.argv.slice(3, process.argv.length);

if (!argv2 || argv2 === "-h") {
  prompt.close();
  return console.info(
    "Usage: clean-sweep <directory> -v | csw <directory> -v | csw -h | clean-sweep -h" +
      "\n\n" +
      "Parameters:" +
      " \n\n" +
      " -v: Prints operation to console" +
      " \n\n" +
      " -h: Shows command usage"
  );
} else if (!params.every((param) => VALID_PARAMS.includes(param))) {
  prompt.close();
  if (params.includes("-h")) {
    return console.info(
      "Please use csw -h or clean-sweep -h to display command usage"
    );
  } else {
    return console.error(
      "Invalid parameter!" +
        "\n\n" +
        "Valid parameters:" +
        " \n\n" +
        " -v: Prints operation to console" +
        " \n\n" +
        " -h: Shows command usage"
    );
  }
} else {
  try {
    prompt.question(
      `Delete all OB files in "${path.resolve(argv2)}"?\nYes or No: `,
      function (answer) {
        if (["yes", "y"].includes(answer.toLowerCase())) {
          if (params.includes("-v")) {
            cleanSweep.sweep(argv2, { verbose: true });
          } else {
            cleanSweep.sweep(argv2);
          }
          prompt.close();
        } else {
          prompt.close();
          return;
        }
      }
    );
  } catch (err) {
    prompt.close();
    if (err.code == "ENOENT") {
      console.error(`Directory "${argv2}" does not exist`);
    } else {
      console.error(err.message);
    }
  }
}
