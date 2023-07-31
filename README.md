# Clean Sweep

> Delete all empty files and folders in a target directory.

## How to Use

### Installation (as a script)

```bash
npm install clean-sweep -g
```

### Usage (as a script)

```bash
clean-sweep <path/to/directory>
# OR
csw <path/to/directory>

```

**The first argument is the path to the directory in which the operation would be performed**

### Example

```bash
clean-sweep ./music
# OR
csw ./music
```

_in code..._

### Installation (in code)

```bash
npm install clean-sweep --save
```

### Usage (in code)

```javascript
const cleanSweep = require("clean-sweep");
const fileDirectory = "<replace file directory here>";

try {
  cleanSweep.sweep(fileDirectory);
} catch (err) {
  if (err.code == "ENOENT") {
    console.error("Directory does not exist");
  } else {
    console.error(err.message);
  }
}
```
