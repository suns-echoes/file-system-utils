Create folder
=============
**Create single folder or path**

Method creates single folder or nested folders according to provided path.

```js
/* Promise */ StringUtils.createFolder(
	/* string */ path
)
```


## Arguments

* `<string>` `path` - path to create.

## Returns

* `<Promise>` - the promise of folder creation.


## Examples

```js
// create folder
await StringUtils.createFolder(
	'new-folder'
);

// create path (nested folders)
await StringUtils.createFolder(
	'new/nested/folders'
);
```
