File System Utilities
=====================

`file-system-utils` library add file system methods which simplifies files read/write/delete, folders create/remove and more.


Installation
------------

`npm i @suns-echoes/file-system-utils`


Usage
-----

```js
// import library distribution (only default export)
import FileSystemUtils from './libs/file-system-utils/index.js';
```

```js
// import library from source (default export)
import FileSystemUtils from './libs/file-system-utils/src/index.js';
```

```js
// import library from source (named export)
import { FileSystemUtils } from './libs/file-system-utils/src/file-system-utils.js';
```

```js
// import single util from source (only named exports)
import { isFile } from './libs/file-system-utils/src/utils/is-file.js';
```


Methods
-------

### Async

* [createFolder](./docs/utils/create-folder.md)
* [isFile](./docs/utils/is-file.md)
* [isFolder](./docs/utils/is-folder.md)
* [readJSONFile](./docs/utils/read-json-file.md)
* [writeJSONFile](./docs/utils/write-json-file.md)

### Sync

* *None by now, use **async** ;)*


Running the Test Suite
----------------------

Library contains lots of tests to ensure highest quality.

* `npm run coverage` - runs the unit tests and shows the coverage
* `npm run test` - runs the unit tests
* `npm run lint` - runs the linter


License
-------

Licensed under MIT

Copyright (c) 2019 Aneta Suns
