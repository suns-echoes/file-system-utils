Is Folder
=========

Method checks if entity with given path is folder.

Note: *Returns false if entity is symlink to folder.*

```js
/* Promise */ FileSystemUtils.isFolder(
	/* string */ path
)
```


Arguments
---------

* `<string>` `path` - entity path.


Returns
-------

* `<Promise>` - the promise of check.


Examples
--------

```js
// return true if path exists
await FileSystemUtils.isFolder(
	'path/to/folder'
);

// return false
await FileSystemUtils.isFolder(
	'path/to/file.txt'
);

// return false if entity is symlink (even if it points to folder)
await FileSystemUtils.isFolder(
	'path/to/symlink'
);
```
