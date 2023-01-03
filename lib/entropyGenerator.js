import { Buffer } from 'buffer'

const isArrayOfIntegers = (param) => {
    const noParamMeg = 'Parameter of generateEntropy function was not set.'
    const noArrayMeg = 'Parameter of generateEntropy should be an Array.'
    const wrongArrayMeg = 'Parameter of generateEntropy should be an Array of Integer.'

    if (!param) throw new TypeError(noParamMeg)
    if (!Array.isArray(param)) throw new TypeError(noArrayMeg)
    if (!param.every(Number.isInteger)) throw new TypeError(wrongArrayMeg)

    return true
}

const generateEntropy = (param) => {
    isArrayOfIntegers(param)
    return Buffer.from(param)
}

export { generateEntropy }
