declare type FilterFunction = (path: string, isDirectory: boolean) => boolean;
declare type Filter = RegExp | FilterFunction;

declare interface TryCatchError {
	code: 'ENOENT' | string,
}
