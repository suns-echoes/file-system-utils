import * as Sinon from 'sinon';

declare global {
	// eslint-disable-next-line no-var
	var sinon: typeof Sinon;
	// eslint-disable-next-line no-var
	var expect: Chai.ExpectStatic;
}

export {};
