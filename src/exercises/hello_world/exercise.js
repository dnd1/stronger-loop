import runner from '../../lib/runner';

function runFunction(helloWorld) {
    console.log(`helloWorld('World') = ${helloWorld('World')}`);
    console.log(`helloWorld('ES2015') = ${helloWorld('ES2015')}`);
    console.log(`helloWorld('ES6') = ${helloWorld('ES6')}`);
}

export default runner(runFunction);
