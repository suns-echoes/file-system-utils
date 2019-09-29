Copy
====

Method copies file or folder with it's content.

Note: *If "src" is file than filter will not apply.*


Usage
-----

```js
await FileSystemUtils.copy(src, dest, filter);
```


### Arguments

* `<string>` `src` - source path;
* `<string>` `dest` - destination path;
* `<function|regexp>` `[filter]` - optional, copy if function or regexp test returns true.


### Returns

* `<Promise>` - the promise of copy.


Examples
--------

### copy file

```js
// create copy of the file with new name
await FileSystemUtils.copy('path/src-file.txt',	'path/dest-file.txt');

// copy file to new path that does not yet exists
// (in this case destination file name must be provided)
await FileSystemUtils.copy('path/file.txt', 'non/existing/path/file.txt');

// copy file to existing folder
// (in this case dest file name is optional)
await FileSystemUtils.copy('path/file.txt', 'new/path');
```

### copy folder

```js
// copy folder with content
await FileSystemUtils.copy('src-folder', 'dest-folder');
```

### use filter

```js
// skip .spec.js files
function filter(src) {
	return !(/\.spec\.js$/.test(src));
}

await FileSystemUtils.copy('src', 'dest', filter);
```

```js
// copy only .js files
const filter = /\.js$/;

await FileSystemUtils.copy('src', 'dest', filter);
```
