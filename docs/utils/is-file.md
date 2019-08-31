Is File
=======

Method checks if entity with given path is file.

Note: *Returns false if entity is symlink to file.*

```js
/* Promise */ FileSystemUtils.isFile(
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
await FileSystemUtils.isFile(
	'path/to/file.txt'
);

// return false
await FileSystemUtils.isFile(
	'path/to/folder'
);

// return false if entity is symlink (even if it points to file)
await FileSystemUtils.isFile(
	'path/to/symlink'
);
```
