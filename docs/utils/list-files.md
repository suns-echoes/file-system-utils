List files
==========

Method lists all files in provided path and it's subfolders.

Note: *Symlinks are skipped.*


Usage
-----

```js
const fileList = await FileSystemUtils.listFiles(path, depth, filter);
)
```


### Arguments

* `<string>` `path` - path to list;
* `<number>` `[depth=-1]` - optional, maximum subfolders scan depth (def.: -1);
* `<function|regexp>` `[filter]` - optional, copy if function or regexp test returns true.


### Returns

* `<Promise>` - the promise of list.


### Resolves

* `<array>` - list of files.


Examples
--------

### list files

```js
// list all files
const list = await FileSystemUtils.listFiles('path/to/folder');
```

### use filter

```js
// skip .spec.js files
function filter(src) {
	return !(/\.spec\.js$/.test(src));
}

await FileSystemUtils.listFiles('path', -1, filter);
```
