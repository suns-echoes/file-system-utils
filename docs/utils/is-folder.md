If Folder
=========

**Checks if entity is file**

Returns `true` if path to entity is pointing to folder. Otherwise returns false.

Note: *Always return false if entity is symlink.*

```js
/* Promise */ FileSystemUtils.isFolder(
	/* string */ path
)
```


## Arguments

* `<string>` `path` - entity path.


## Returns

* `<Promise>` - the promise of check.


## Examples

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
