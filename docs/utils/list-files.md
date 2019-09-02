List files
==========

Method list all files in given folder and subfolders.

Note: *Symlinks are skipped.*

```js
/* Promise */ FileSystemUtils.listFiles(
	/* string */ path
)
```


Arguments
---------

* `<string>` `path` - path to list.


Returns
-------

* `<Promise>` - the promise of list.


Examples
--------

### copy file

```js
// list all files
await FileSystemUtils.listFiles(
	'path/to/folder'
);
