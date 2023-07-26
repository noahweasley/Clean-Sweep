const fs = require("fs");
const path = require("path");

let fileDirectory = process.argv[2];

if (!fileDirectory) {
  console.log("Please specify the target file directory");
  return;
} else {
  fileDirectory = path.normalize(fileDirectory);
}

const files = fs.readdirSync(fileDirectory, { recursive: true });

files.forEach((file) => {
  const absoluteFile = path.join(fileDirectory, file);

  try {
    const fileSize = fs.statSync(absoluteFile).size;
    console.log(`${file} - ${fileSize} bytes`);

    if (fileSize <= 0) {
      // force delete all files and folders
      fs.rmSync(absoluteFile, { recursive: true, force: true });
      console.log(`\nDeleted ${file}\n`);
    }
  } catch (err) {
    console.error("\n\nError occurred: Cause - " + err.message + "\n\n");
  }
});
