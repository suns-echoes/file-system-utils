Write text file
===============

Method writes string to file.

Note: *Default encoding is **UTF-8**.*

Note: *If file exists, it will be overwritten, otherwise it will be created.*

Note: *If folder(s) does not exist, it will be created.*


Usage
-----

```js
await FileSystemUtils.writeTextFile(filepath, content, encoding);
```


### Arguments

* `<string>` `filepath` - file path;
* `<string>` `content` - content to write to file;
* `<string>` `[content='utf8']` - optional, default is UTF-8, content encoding.


### Returns

* `<Promise>` - the promise of content write.


Examples
--------

```js
// write data to file
await FileSystemUtils.writeTextFile('file.txt', content);

// write data to file even if path does not exist.
await FileSystemUtils.writeTextFile('non/existing/path/file.txt', content);
```
