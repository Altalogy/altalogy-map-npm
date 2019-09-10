This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

1. Clone repository with `git clone`

2. Install:
```
$ yarn install
```

3. Run:
```
$ yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Generate docs

```
$ yarn docs
```

Script builds application to the `build` folder and then moves entire folder to `docs` folder. It is required to use `docs` folder to publish page on GitHub pages.

## Build & publish NPM

```
$ yarn publish:npm
$ npm login
$ npm publish

```

## Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Project's structure

```
dist      # NPM distribution
docs      # GitHub Pages page
public    # contains public assets
src       # application presenting the functionalities of the Altalogy Maps library
  |- ...
  |- components
      |- AltaMap    # implementation of Altalogy Maps library
  |- ...
README.md
package.json

```
