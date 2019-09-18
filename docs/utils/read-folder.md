Read folder
===========

Method lists all files and folder in provided path and it's subfolders.

Note: *Symlinks are skipped.*

```js
/* Promise */ FileSystemUtils.readFolder(
	/* string */ path,
	/* number */ depth,
	/* object */ options
)
```


Arguments
---------

* `<string>` `path` - path to list;
* `<number>` `[depth=-1]` - optional, default is -1, maximum subfolders scan depth;
* `<object>` `[options]` - optional, additional options;
* `<boolean>` `[options.incFiles=true]` - optional, default is true, include files;
* `<boolean>` `[options.incFolders=true]` - optional, default is true, include folders.


Returns
-------

* `<Promise>` - the promise of list.


Examples
--------

### list files and folders

```js
// list all files and folders
const list = await FileSystemUtils.readFolder(
	'path/to/folder'
);

// list all files only, no deeper than 2 levels (root is level 0)
const list = await FileSystemUtils.readFolder(
	'path/to/folder',
	2,
	{ incFolders: false }
);
```
