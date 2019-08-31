Read JSON file
==============

Method reads JSON file and returns promise which resolves with parsed data.

Note: *If file does not exist, promise will resolve with `undefined`.*

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
