Write text file
===============

Method writes string to file.

Note: *Default encoding is **UTF-8**.*

Note: *If file exists, it will be overwritten, otherwise it will be created.*

Note: *If folder(s) does not exist, it will be created.*

```js
/* Promise */ StringUtils.writeTextFile(
	/* string */ filepath,
	/* string */ content,
	/* string */ encoding
)
```


Arguments
---------

* `<string>` `filepath` - file path;
* `<string>` `content` - content to write to file;
* `<string>` `[content='utf8']` - optional, default is UTF-8, content encoding.


Resolves
--------

* `<object>` - nothing.


Returns
-------

* `<Promise>` - the promise of content write.


Examples
--------

```js
// write data to file
await StringUtils.writeTextFile('file.txt', content);

// write data to file even if path does not exist.
await StringUtils.writeTextFile('non/existing/path/file.txt', content);
```
