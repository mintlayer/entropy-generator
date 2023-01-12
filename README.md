# Entropy generator

![branch status](https://github.com/mintlayer/entropy-generator/actions/workflows/node.js.yml/badge.svg)

## Install
```js
npm i entropy-generator
```

## Usage
Call the function `generateEntropy` with an array of integers as parameter. A [Buffer](https://nodejs.org/api/buffer.html) object will be returned.

### Example:
```js
import { generateEntropy } from 'entropy-generator'

const initialArray = [ 1, 170, 55, 80, 190 ]
generateEntropy(initialArray)
// returns: Uint8Array(5) [ 1, 170, 55, 80, 190 ]
```

## Development

### Install deps
```js
npm i
```

### Build
```js
npm run build
```

### Run tests

#### Run once
```js
npm test
```

#### Watch
```js
npm test:watch
```

#### Coverage
```js
npm test:coverage
```

## How to Contribute

[Check here](./CONTRIBUTING.md) to see what you should do, and the rules you should follow, to contribute to this project.