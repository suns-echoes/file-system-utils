Read folder
===========

Method lists all files and folder in provided path and it's subfolders.

Note: *Symlinks are skipped.*


Usage
-----

```js
const { files, folders } = await FileSystemUtils.readFolder(path, depth, { incFiles, incFolders });
```


### Arguments

* `<string>` `path` - path to list;
* `<number>` `[depth=-1]` - optional, maximum subfolders scan depth, (def.: -1);
* `<object>` `[options]` - optional, additional options;
* `<boolean>` `[options.incFiles=true]` - optional, include files (def.: true);
* `<boolean>` `[options.incFolders=true]` - optional, include folders (def.: true).


### Returns

* `<Promise>` - the promise of list.


### Resolves

* `<object>` - lists of `files` and `folders`.

```js
{
	files: [...] || null,
	folders: [...] || null,
}
```


Examples
--------

### list files and folders

```js
// list all files and folders
const { files, folders } = await FileSystemUtils.readFolder('path/to/folder');

// list all files only, no deeper than 2 levels (root is level 0)
const { files } = await FileSystemUtils.readFolder('path/to/folder', 2, { incFolders: false });
```
