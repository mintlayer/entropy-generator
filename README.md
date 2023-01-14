# Entropy generator

![branch status](https://github.com/mintlayer/entropy-generator/actions/workflows/node.js.yml/badge.svg)

## Install
```js
npm i entropy-generator
```

## Usage

### generateEntropy
Call the function `generateEntropy` with a normalized array of integers as parameter.
A [Buffer](https://nodejs.org/api/buffer.html) object will be returned.


By "normalized" it means all values should be between 0-255. You can normalize you array by yourself or [the normalizer function](https://github.com/mintlayer/entropy-generator#normalize) exported also by this library.

#### Example:
```js
import { generateEntropy } from 'entropy-generator'

const initialArray = [ 1, 170, 55, 80, 190 ]
generateEntropy(initialArray)
// returns: Uint8Array(5) [ 1, 170, 55, 80, 190 ]
```

### normalize
Call the function `normalize` an array of integers as parameter.
Another array will be returned with all values between 0-255.

#### Example:
```js
import { normalize } from 'entropy-generator'

const initialArray = [-2000, -15000, 300, 400, 1500]
normalize(initialArray)
// returns: Uint8Array(5) [ 201, 0, 236, 238, 255 ]
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
npm run test:watch
```

#### Coverage
```js
npm run test:coverage
```

## How to Contribute

[Check here](./CONTRIBUTING.md) to see what you should do, and the rules you should follow, to contribute to this project.