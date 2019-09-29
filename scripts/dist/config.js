export const config = {
	paths: {
		dist: 'dist',
		main: {
			input: 'src/index.js',
			output: 'dist/index.js',
		},
		src: {
			input: 'src',
			output: 'dist/src',
		},
		docs: {
			input: 'docs',
			output: 'dist/docs',
		},
	},
	rollup: {
		plugins: {
			minify: {
				comments: false,
				booleans: false,
				builtIns: true,
				consecutiveAdds: true,
				deadcode: true,
				evaluate: true,
				flipComparisons: true,
				guards: true,
				infinity: false,
				mangle: true,
				memberExpressions: true,
				mergeVars: true,
				numericLiterals: true,
				propertyLiterals: true,
				regexpConstructors: true,
				removeConsole: false,
				removeDebugger: true,
				removeUndefined: true,
				replace: true,
				simplify: true,
				simplifyComparisons: false,
				typeConstructors: true,
				undefinedToVoid: true,
			},
		},
	},
};
