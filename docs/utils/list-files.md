List files
==========

Method lists all files in provided path and it's subfolders.

Note: *Symlinks are skipped.*

```js
/* Promise */ FileSystemUtils.listFiles(
	/* string */ path
	/* number */ depth
)
```


Arguments
---------

* `<string>` `path` - path to list;
* `<number>` `[depth=-1]` - optional, default is -1, maximum subfolders scan depth.


Returns
-------

* `<Promise>` - the promise of list.


Examples
--------

### list files

```js
// list all files
const list = await FileSystemUtils.listFiles(
	'path/to/folder'
);
```
