declare type FilterFunction = (src: string, dest: string) => boolean;
declare type Filter = RegExp | FilterFunction;
