Write JSON file
===============

**Write JSON data to file**

Method serialize and writes JSON data to file.

Note: *If file exists, it will be overwritten, otherwise it will be created.*
Note: *If folder(s) does not exists, it will be created.*

```js
/* Promise */ StringUtils.writeJSONFile(
	/* string */ filepath,
	/* object */ data
 	/* function */ [replacer]
 	/* string */ [space]
)
```


Arguments
---------

* `<string>` `filepath` - file path;
* `<object>` `data` - data to write to file;
* `<function>` `[replacer]` - optional, replacer function for JSON stringify;
* `<string>` `[space]` - optional, indent space for JSON stringify.


Resolves
--------

* `<object>` - parsed JSON object.


Returns
-------

* `<Promise>` - the promise of data write.


Examples
--------

```js
// write data to file
await StringUtils.writeJSONFile('data.json', { ...data });

// write data to file even if path does not exists.
await StringUtils.writeJSONFile('non/existing/path/data.json', { ...data });
```
