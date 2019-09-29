File System Utilities
=====================

`file-system-utils` library add file system methods which simplifies files read/write/delete, folders create/remove and more.


Installation
------------

`npm i @suns-echoes/file-system-utils`


Usage
-----

```js
// CommonJS library distribution file (only default export)
import exec from '@suns-echoes/file-system-utils';
```

```js
// import library from source (default export)
import FileSystemUtils from './libs/@suns-echoes/file-system-utils/src/index';
```

```js
// import library from source (named export)
import { FileSystemUtils } from './libs/@suns-echoes/file-system-utils/src/file-system-utils';
```

```js
// import single util from source (only named exports)
import { isFile } from './libs/@suns-echoes/file-system-utils/src/utils/is-file';
```


Methods
-------

### Async

* [copy](./docs/utils/copy.md)
* [createFolder](./docs/utils/create-folder.md)
* [isFile](./docs/utils/is-file.md)
* [isFolder](./docs/utils/is-folder.md)
* [listFiles](./docs/utils/list-files.md)
* [readFolder](./docs/utils/read-folder.md)
* [readJSONFile](./docs/utils/read-json-file.md)
* [readTextFile](./docs/utils/read-text-file.md)
* [remove](./docs/utils/remove.md)
* [writeJSONFile](./docs/utils/write-json-file.md)
* [writeTextFile](./docs/utils/write-text-file.md)

### Sync

* *None by now, use **async** ;)*


License
-------

Licensed under MIT

Copyright (c) 2019 Aneta Suns
