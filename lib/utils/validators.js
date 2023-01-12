const defaultRange = {
    min_measured_range: 255,
    max_measured_range: 0,
}

const isArray = (param, functionName = 'isArray', paramName = 'param') => {
    const noParamMeg = `Parameter ${paramName} of ${functionName} function was not set.`
    const noArrayMeg = `Parameter ${paramName} of ${functionName} should be an Array.`

    if (!param) throw new TypeError(noParamMeg)
    if (!Array.isArray(param)) throw new TypeError(noArrayMeg)
}

const isNormalizedArray = (array) => {
    const notNormalized = 'Array passed was not normalized.'
    isArray(array, 'isNormalizedArray', 'array')
    if (Math.max(...array) > 255 || Math.min(...array) < 0) throw new RangeError(notNormalized)

    return true
}

const isValueWithinTheRange = (value, range = defaultRange) => {
    const { max_measured_range, min_measured_range } = range
    const wrongType = `Parameter ${value} should be a number but is ${typeof value}.`
    const belowRange = `Parameter ${value} is below the specified range ${min_measured_range}-${max_measured_range}.`
    const aboveRange = `Parameter ${value} is above the specified range ${min_measured_range}-${max_measured_range}.`

    if (value === null || value === undefined || value === '' || Number.isNaN(Number(value)))
        throw new TypeError(wrongType)
    if (value < min_measured_range) throw new RangeError(belowRange)
    if (value > max_measured_range) throw new RangeError(aboveRange)

    return true
}

const isArrayOfIntegers = (param) => {
    const wrongArrayMeg = 'Parameter of generateEntropy should be an Array of Integer.'

    isArray(param, 'isArrayOfIntegers')
    if (!param.every(Number.isInteger)) throw new TypeError(wrongArrayMeg)

    return true
}

export { isArrayOfIntegers, isValueWithinTheRange, isNormalizedArray }
