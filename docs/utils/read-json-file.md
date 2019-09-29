Read JSON file
==============

Method reads JSON file and returns promise which resolves with parsed data.

Note: *If file does not exist, promise will resolve with `undefined`.*


Usage
-----

```js
const data = await FileSystemUtils.readJSONFile(path);
```


### Arguments

* `<string>` `filepath` - file path.


### Returns

* `<Promise>` - the promise of data read.


### Resolves

* `<object>` - parsed JSON object.


Examples
--------

### read data from JSON file

```js
const data = await FileSystemUtils.readJSONFile('file.json');
```
