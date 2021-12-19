# Create folder

Method creates single folder or nested folders according to given path.

## Usage

```js
await FileSystemUtils.createFolder(path);
```

### Arguments

* `<string>` `path` - path to create.

### Returns

* `<Promise>` - the promise of folder creation.

## Examples

### create folder

```js
await FileSystemUtils.createFolder('new-folder');
```

### create path (nested folders)

```js
await FileSystemUtils.createFolder('new/nested/folders');
```
