import { Buffer } from 'buffer'
import { isArrayOfIntegers } from './utils/validators'

const generateEntropy = (param) => {
    isArrayOfIntegers(param)
    return Buffer.from(param)
}

export { generateEntropy }
