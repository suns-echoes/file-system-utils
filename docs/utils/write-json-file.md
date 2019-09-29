Write JSON file
===============

Method serialize given data and writes it in JSON format to file.

Note: *If file exists, it will be overwritten, otherwise it will be created.*

Note: *If folder(s) does not exist, it will be created.*


Usage
-----

```js
await FileSystemUtils.writeJSONFile(filepath, data, replacer, space);
```


### Arguments

* `<string>` `filepath` - file path;
* `<object>` `data` - data to write to file;
* `<function>` `[replacer]` - optional, replacer function for JSON stringify;
* `<string>` `[space]` - optional, indent space for JSON stringify.


### Returns

* `<Promise>` - the promise of data write.


Examples
--------

```js
// write data to file
await FileSystemUtils.writeJSONFile('file.json', { data: 72 });

// write data to file even if path does not exist.
await FileSystemUtils.writeJSONFile('non/existing/path/file.json', { data: 72 });
```
