import { isArrayOfIntegers, isValueWithinTheRange } from './utils/validators'

const defaultScalingOptions = {
    max_required_range: 255,
    min_required_range: 0,
}

// NOTE if the original measured range is less < 0.5 * the required range the output may be biased
const scaleValue = (
    measured_value,
    min_measured_range,
    max_measured_range,
    options = defaultScalingOptions,
) => {
    isValueWithinTheRange(measured_value, { min_measured_range, max_measured_range })
    const { max_required_range, min_required_range } = options

    // if we are scaling up then we need to do some jiggery pokery first
    // use a pseudorandom nonce to slightly blind the value before scaling
    // Math.random() returns a ieee 754 float
    // We call rand twice to scale the "random" value "randomly"
    if (max_measured_range - min_measured_range < max_required_range - min_required_range) {
        var nonce = Math.random() * Math.random()
        //if we're already close to the range then let's ignore it
        if (measured_value + nonce < max_measured_range) {
            measured_value += nonce
        }
    }

    const absValue = Math.abs(measured_value)
    const scaledValue =
        (max_required_range - min_required_range) *
            ((absValue - min_measured_range) / (max_measured_range - min_measured_range)) +
        min_required_range
    return Math.round(scaledValue)
}

const normalize = (toNormalize) => {
    isArrayOfIntegers(toNormalize)

    const [minMeasured, maxMeasured] = [Math.min(...toNormalize), Math.max(...toNormalize)]
    if (maxMeasured - minMeasured === 0)
        throw new Error(
            `The result of MAX measured value and MIN measured value cannot be 0. You MAX is ${maxMeasured} and your MIN is ${minMeasured}`,
        )

    const normalizedArray = []
    for (let i = 0; i < toNormalize.length; i++)
        normalizedArray[i] = scaleValue(toNormalize[i], minMeasured, maxMeasured)

    return normalizedArray
}

export { scaleValue, normalize }
