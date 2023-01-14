import { Buffer } from 'buffer'
import shuffle from 'crypto-shuffle'
import getRandomValues from 'get-random-values'
import { isArrayOfIntegers, isNormalizedArray } from './utils/validators'

const getRandomArray = (length) => 
    getRandomValues(new Uint8Array(length))

const generateEntropy = (param) => {
    isArrayOfIntegers(param)
    isNormalizedArray(param)

    const shuffledArray = shuffle(param)
    const randomArray = getRandomArray(param.length)
    const entropy = []
    for (let i = 0 ; i < param.length ; i++)
        entropy[i] = randomArray[i] ^ shuffledArray[i]

    return Buffer.from(entropy)
}

export { generateEntropy }
