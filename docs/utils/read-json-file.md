Read JSON file
==============

**Read JSON file contents and parse it**

Method reads JSON file and resolves with parsed data.

Note: *If file does not exists, method will resolve with `undefined`.*

```js
/* Promise */ StringUtils.readJSONFile(
	/* string */ path
)
```


Arguments
---------

* `<string>` `filepath` - file path.


Resolves
--------

* `<object>` - parsed JSON object.


Returns
-------

* `<Promise>` - the promise of data read.


Examples
--------

```js
// read file
const data = await StringUtils.readJSONFile('data.json');
```
