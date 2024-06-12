# Clean Sweep

![license](https://img.shields.io/github/license/noahweasley/clean-sweep) ![GitHub tag (with filter)](https://img.shields.io/github/v/tag/noahweasley/clean-sweep?label=Latest%20release&color=yellow) ![npm downloads](https://img.shields.io/npm/dw/clean-sweep?label=NPM%20downloads&color=red)

> Delete all files and folders in a target directory, according to a threshHold file size.

## How to Use

### Installation (as a script)

```bash
npm install clean-sweep -g
```

### Usage (as a script)

```bash
clean-sweep <path/to/directory> -v -t <bytes>
# OR
csw <path/to/directory> -v -t <bytes>

```

- The first argument is the path to the directory in which the operation would be performed, and is required!
- The remaining are optional

### Optional Parameters

-v: prints out the operation of the sweep function to console if specified
-t: specifies the threshold. Threshold here is the file size(in bytes), in which with, files with sizes below this threshold, are deleted

### Example

```bash
clean-sweep ./music
clean-sweep ./music -v
clean-sweep ./music -t 200
# OR
csw ./music
csw ./music -v
csw ./music -t 200
```

### Installation (in code)

```bash
npm install clean-sweep --save
```

### Usage (in code, synchronously)

```javascript
const cleanSweep = require("clean-sweep");
const fileDirectory = "<replace file directory here>";

try {
  cleanSweep.sweepSync(fileDirectory, {
    /* specify if operation info should be printed to console, defaults to false */
    verbose: true,
    /* all files with size(in byte) below this thresh hold are deleted, defaults to 0 */
    threshHold: 200
  });
} catch (err) {
  if (err.code == "ENOENT") {
    console.error("Directory does not exist");
  } else {
    console.error(err.message);
  }
}
```

### Usage (in code, asynchronously)

```javascript
const cleanSweep = require("clean-sweep").promises;
const fileDirectory = "<replace file directory here>";

(async function () {
  try {
    await cleanSweep.sweep(fileDirectory, {
      /* specify if operation info should be printed to console, defaults to false */
      verbose: true,
      /* all files with size(in byte) below this thresh hold are deleted, defaults to 0 */
      threshHold: 200
    });
  } catch (err) {
    if (err.code == "ENOENT") {
      console.error("Directory does not exist");
    } else {
      console.error(err.message);
    }
  }
})();
```
