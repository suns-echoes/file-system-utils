Remove
======

Method removes file or folder with it's content.

Note: *This method will not throw error if path does not exist.*


Usage
-----

```js
await FileSystemUtils.remove(path, filter);
```


### Arguments

* `<string>` `path` - path to remove;
* `<function|regexp>` `[filter]` - optional, remove if function or regexp test returns true.


### Returns

* `<Promise>` - the promise of entity removal.


Examples
--------

### remove file

```js
FileSystemUtils.remove('path/to/file.txt');
```

### remove folder (with content)

```js
FileSystemUtils.remove('path/to/folder');
```

### remove all .js files

```js
FileSystemUtils.remove('path/to/folder', /\.js$/);
```
