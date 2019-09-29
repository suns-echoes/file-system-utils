Read text file
==============

Method reads text file and returns promise which resolves with file content.

Note: *Default encoding is **UTF-8**.*

Note: *If file does not exist, promise will resolve with `undefined`.*


Usage
-----

```js
const data = await FileSystemUtils.readTextFile(path, encoding);
```


### Arguments

* `<string>` `filepath` - file path;
* `<string>` `[encoding=utf8]` - optional, content encoding (def.: UTF-8).


### Returns

* `<Promise>` - the promise of file content read.


### Resolves

* `<string>` - file content.


Examples
--------

### read data from text file with UTF-8 encoding

```js
const content = await FileSystemUtils.readTextFile('file.txt');
```
