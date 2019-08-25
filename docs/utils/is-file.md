If File
=======

**Checks if entity is file**

Returns `true` if path to entity is pointing to file. Otherwise returns false.

Note: *Always return false if entity is symlink.*

```js
/* Promise */ FileSystemUtils.isFile(
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
