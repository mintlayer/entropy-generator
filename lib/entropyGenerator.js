import { Buffer } from 'buffer'
import shuffle from 'crypto-shuffle'
import getRandomValues from 'get-random-values'
import { isArrayOfIntegers, isNormalizedArray, isLengthValid } from './utils/validators'

const getRandomArray = (length) => getRandomValues(new Uint8Array(length))

const getEntropyBuffer = (entropy, length) =>
    length ? Buffer.from(entropy.slice(0, length)) : Buffer.from(entropy)

const xorItems = (array1, array2) => {
    const resultArray = []
    for (let i = 0; i < array1.length; i++) resultArray[i] = array1[i] ^ array2[i]
    return resultArray
}

const generateEntropy = (param, length) => {
    isArrayOfIntegers(param)
    isNormalizedArray(param)
    isLengthValid(param, length)

    const shuffledArray = shuffle(param)
    const randomArray = getRandomArray(param.length)
    const entropy = xorItems(shuffledArray, randomArray)

    return getEntropyBuffer(entropy, length)
}

export { generateEntropy }
