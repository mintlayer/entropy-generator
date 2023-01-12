import { isValueWithinTheRange } from './utils/validators'

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

export { scaleValue }
