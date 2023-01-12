import { Buffer } from 'buffer'
import { isArrayOfIntegers, isNormalizedArray } from './utils/validators'

const generateEntropy = (param) => {
    isArrayOfIntegers(param)
    isNormalizedArray(param)
    return Buffer.from(param)
}

export { generateEntropy }
