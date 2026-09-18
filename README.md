# Entropy generator
An entropy generator based on first durstenfeld variant of fisher-yates.


## Versions
This is the main branch.

Latest packages can be find on [npm](https://www.npmjs.com/package/@mintlayer/entropy-generator) or [releases](https://github.com/mintlayer/entropy-generator/releases).

Latest public package source code can be found here: [main](https://github.com/mintlayer/entropy-generator)


![branch status](https://github.com/mintlayer/entropy-generator/actions/workflows/node.js.yml/badge.svg)


## Install
```js
npm i @mintlayer/entropy-generator
```

## Environment support
Requires Node.js 20+ or an environment providing `crypto.getRandomValues`.
In browsers, use a bundler — the `buffer` dependency is resolved automatically.

Note on output quality: the input array shapes the shuffle, but every output byte is XORed with cryptographically secure random bytes, so the result is uniformly random regardless of the input.

## Usage

### generateEntropy
Call the function `generateEntropy` with a normalized array of integers as parameter.
The second parameter(optional) is the size of the output. If set, it has to be a non-negative integer, smaller or the same size as the input. 
A [Buffer](https://nodejs.org/api/buffer.html) object will be returned.


By "normalized" it means all values should be between 0-255. You can normalize you array by yourself or [the normalizer function](https://github.com/mintlayer/entropy-generator#normalize) exported also by this library.

#### Example 1:
```js
import { generateEntropy } from '@mintlayer/entropy-generator'

const initialArray = [ 1, 170, 55, 80, 190 ]
const entropy = generateEntropy(initialArray)
// entropy size: 5
```

#### Example 2:
```js
import { generateEntropy } from '@mintlayer/entropy-generator'

const initialArray = [ 1, 170, 55, 80, 190 ]
const entropy = generateEntropy(initialArray, 3)
// entropy size: 3
```


### normalize
Call the function `normalize` an array of integers as parameter.
Another array will be returned with all values between 0-255.

#### Example:
```js
import { normalize } from '@mintlayer/entropy-generator'

const initialArray = [-2000, -15000, 300, 400, 1500]
normalize(initialArray)
// returns: [ 201, 0, 236, 238, 255 ]
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

#### Lint
```js
npm run lint
```

## How to Contribute

[Check here](./CONTRIBUTING.md) to see what you should do, and the rules you should follow, to contribute to this project.