import { isArrayOfIntegers, isValueWithinTheRange } from './utils/validators'

const defaultScalingOptions = {
    max_required_range: 255,
    min_required_range: 0,
}

const scaleValue = (
    measured_value,
    min_measured_range,
    max_measured_range,
    options = defaultScalingOptions,
) => {
    isValueWithinTheRange(measured_value, { min_measured_range, max_measured_range })
    const { max_required_range, min_required_range } = options
    return (
        (max_required_range - min_required_range) *
            ((measured_value - min_measured_range) / (max_measured_range - min_measured_range)) +
        min_required_range
    )
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
        normalizedArray[i] = Math.round(scaleValue(toNormalize[i], minMeasured, maxMeasured))

    return normalizedArray
}

export { scaleValue, normalize }
