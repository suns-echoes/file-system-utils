declare type FilterFunction = (srcPath: string, destPath: string, isDirectory: boolean) => boolean;
declare type Filter = RegExp | FilterFunction;

declare interface NodeError<TCode = string> {
	code: TCode,
	message: string,
}

declare type NodeFSError = NodeError<
'EACCES' |
'EADDRINUSE' |
'ECONNREFUSED' |
'ECONNRESET' |
'EEXIST' |
'EISDIR' |
'EMFILE' |
'ENOENT' |
'ENOTDIR' |
'ENOTEMPTY' |
'ENOTFOUND' |
'EPERM' |
'EPIPE' |
'ETIMEDOUT'
>;

declare type FSUProcessErrorCode =
	/**
	 * Success, no error.
	 */
	'OK' |
	/**
	 * Aborted by user.
	 */
	'ABORTED' |
	/**
	 * Timeout fail.
	 */
	'TIMEOUT' |
	/**
	 * Generic failure.
	 */
	'FAILED';

declare interface FSUError {
	code: FSUProcessErrorCode,
	message: string,
}
