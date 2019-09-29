File System Utilities
=====================

`file-system-utils` library add file system methods which simplifies files read/write/delete, folders create/remove and more.


Installation
------------

`npm i @suns-echoes/file-system-utils`


Import
------

```js
// Import library distribution file
import { FileSystemUtils } from '@suns-echoes/file-system-utils';
```

```js
// import library from source
import FileSystemUtils from '@suns-echoes/file-system-utils/src';
// or
import { FileSystemUtils } from '@suns-echoes/file-system-utils/src/file-system-utils';
```

```js
// import single util from source
import { isFile } from '@suns-echoes/file-system-utils/src/utils/is-file';
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
