import { describe, it } from 'mocha';
import { expect } from 'chai';

const helloWorld = global.submission;

describe('Hello, World!', () => {
    it('should export a function', () => {
        expect(helloWorld).to.exist;
        expect(helloWorld).to.be.a('function');
    });

    it('should return a string', () => {
        expect(helloWorld('test')).to.be.a('string');
    });

    it('should return a Hello, World! message', () => {
        expect(helloWorld('World')).to.equal('Hello, World!');
        expect(helloWorld('ES2015')).to.equal('Hello, ES2015!');
        expect(helloWorld('ES6')).to.equal('Hello, ES6!');
    });
});
