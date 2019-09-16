Read text file
==============

Method reads text file and returns promise which resolves with file content.

Note: *Default encoding is **UTF-8**.*

Note: *If file does not exist, promise will resolve with `undefined`.*

```js
/* Promise */ StringUtils.readTextFile(
	/* string */ path,
	/* string */ encoding
)
```


Arguments
---------

* `<string>` `filepath` - file path;
* `<string>` `[encoding=utf8]` - optional, default is UTF-8, content encoding.


Resolves
--------

* `<string>` - file content.


Returns
-------

* `<Promise>` - the promise of file content read.


Examples
--------

```js
// read file
const content = await StringUtils.readTextFile('file.txt');
```
