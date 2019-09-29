Is File
=======

Method checks if entity with given path is file.

Note: *Returns false if entity is symlink to file.*


Usage
-----

```js
const pathIsFile = await FileSystemUtils.isFile(path);
```


### Arguments

* `<string>` `path` - entity path.


### Returns

* `<Promise>` - the promise of check.


### Resolves

* `<boolean>` - is path a file.


Examples
--------

```js
// return true if path exists and is file
await FileSystemUtils.isFile('path/to/file.txt');

// return false
await FileSystemUtils.isFile('path/to/folder');

// return false if entity is symlink (even if it points to file)
await FileSystemUtils.isFile('path/to/symlink');
```
