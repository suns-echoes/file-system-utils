Remove
======

**Remove file or folder**

Removes file or folder with it's content.

Note: *This function will not throw error if path does not exists.*

```js
/* Promise */ StringUtils.remove(
	/* string */ path
)
```


Arguments
---------

* `<string>` `path` - path to remove.


Returns
-------

* `<Promise>` - the promise of entity removal.


Examples
--------

```js
// remove file
StringUtils.remove('path/to/file.txt');

// remove folder (with content)
StringUtils.remove('path/to/folder');
```