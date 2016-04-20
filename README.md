workshopper-mocha-boilerplate
==========

> A boilerplate for workshopper modules with Mocha tests and ES6 syntax

[![npm](https://img.shields.io/npm/v/workshopper-mocha-boilerplate.svg?style=flat-square)](https://www.npmjs.com/package/workshopper-mocha-boilerplate) [![Build Status](https://img.shields.io/travis/ThibWeb/workshopper-mocha-boilerplate.svg?style=flat-square)](https://travis-ci.org/ThibWeb/workshopper-mocha-boilerplate) [![dependency Status](https://img.shields.io/david/ThibWeb/workshopper-mocha-boilerplate.svg?style=flat-square)](https://david-dm.org/ThibWeb/workshopper-mocha-boilerplate) [![devDependency Status](https://img.shields.io/david/dev/ThibWeb/workshopper-mocha-boilerplate.svg?style=flat-square)](https://david-dm.org/ThibWeb/workshopper-mocha-boilerplate)

![Screenshot](screenshot.png)

1. Install [Node.js](http://nodejs.org/)
2. Run `npm install -g workshopper-mocha-boilerplate`
3. Run `workshopper-mocha-boilerplate`
4. **.. profit!**

## Releasing your own workshopper module

First, install the project and make sure it runs:

```sh
git clone git@github.com:ThibWeb/workshopper-mocha-boilerplate.git
cd workshopper-mocha-boilerplate
npm install
node src/index.js
```

Then, replace all references to [`workshopper-mocha-boilerplate`](https://github.com/ThibWeb/workshopper-mocha-boilerplate/search?utf8=%E2%9C%93&q=workshopper-mocha-boilerplate) and [`ThibWeb`](https://github.com/ThibWeb/workshopper-mocha-boilerplate/search?utf8=%E2%9C%93&q=ThibWeb) with your own module's name and GitHub account name. Customize the [`README`](README.md) and [`LICENSE`](LICENSE) files for your need.

Then it's time to write some exercises! Have a look at the [example exercise](src/exercises/hello_world/), and get cracking. The point of this boilerplate is to make it easier to write workshoppers by using Mocha, so you should be at ease here.

To add a new exercise, you need to:

1. Add it to `src/exercises/menu.json`
2. Add the directory to `src/exercises/`, with a name matching the one in the menu
3. Add a `.spec.js` file in `src/tests`
4. Add test commands in `tests.sh`

To check your work, make sure to:

```sh
# Run your workshopper manually
node src/index.js
# Run linting and unit tests
npm run lint
npm run test
# Make sure your project compiles down to ES5
npm run build
# Setup your project on a CI platform like Travis, where it will run
npm run test:ci
```

## Contributing

Install the project with:

```sh
git clone git@github.com:ThibWeb/workshopper-mocha-boilerplate.git
cd workshopper-mocha-boilerplate
npm install
npm install -g eslint babel-eslint eslint-config-airbnb
./.githooks/deploy
```

To run the workshopper locally:

```sh
node src/index.js
```

To release a new version:

```sh
npm version minor -m "Release %s"
git push origin master
git push --tags
npm publish
```

## Credits

This boilerplate was extracted from the [Test-drive D3](https://github.com/ThibWeb/testdrived3) workshopper, and is originally inspired by [Thinking in React](https://github.com/asbjornenge/thinking-in-react).
