# Clean Sweep

  ![license](https://img.shields.io/github/license/noahweasley/clean-sweep) ![GitHub tag (with filter)](https://img.shields.io/github/v/tag/noahweasley/clean-sweep?label=Latest%20release&color=yellow) ![npm downloads](https://img.shields.io/npm/dw/clean-sweep?label=NPM%20downloads&color=red)


> Delete all empty files and folders in a target directory.

## How to Use

### Installation (as a script)

```bash
npm install clean-sweep -g
```

### Usage (as a script)

```bash
clean-sweep <path/to/directory> -v
# OR
csw <path/to/directory> -v

```

- The first argument is the path to the directory in which the operation would be performed, and is required!
- The remaining are optional, -v parameter prints out the operation of the sweep function to console if specifies

### Example

```bash
clean-sweep ./music
clean-sweep ./music -v
# OR
csw ./music
csw ./music -v
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
  cleanSweep.sweepSync(fileDirectory, { verbose: true });
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
const fileDirectory = "./";

(async function () {
  try {
    await cleanSweep.sweep(fileDirectory, { verbose: true });
  } catch (err) {
    if (err.code == "ENOENT") {
      console.error("Directory does not exist");
    } else {
      console.error(err.message);
    }
  }
})();
```
