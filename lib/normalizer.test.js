import { expect, describe, it } from 'vitest'
import { scaleValue } from './normalizer'

describe.concurrent('Scale Value', () => {
    const [min_measured_range, max_measured_range] = [-5, 500]

    it('Value already between 0-255', () => {
        const toScale = 42
        const scaledValue = scaleValue(toScale, min_measured_range, max_measured_range)
        expect(scaledValue).toBeLessThanOrEqual(255)
        expect(scaledValue).toBeGreaterThanOrEqual(0)
    })

    it('Value greater than 255', () => {
        const toScale = 420
        const scaledValue = scaleValue(toScale, min_measured_range, max_measured_range)
        expect(scaledValue).toBeLessThanOrEqual(255)
        expect(scaledValue).toBeGreaterThanOrEqual(0)
    })

    it('Value smaller then 0', () => {
        const toScale = -3
        const scaledValue = scaleValue(toScale, min_measured_range, max_measured_range)
        expect(scaledValue).toBeLessThanOrEqual(255)
        expect(scaledValue).toBeGreaterThanOrEqual(0)
    })

    //validations
    it('No param', () => {
        expect(() => scaleValue()).toThrow(TypeError)
    })

    it('Wrong param type', () => {
        expect(() => scaleValue('string')).toThrow(TypeError)
    })

    it('Value greater than max range limit', () => {
        const toScale = 420
        expect(() => scaleValue(toScale, min_measured_range, 300)).toThrow(RangeError)
    })

    it('Value greater than max range limit', () => {
        const toScale = 1
        expect(() => scaleValue(toScale, 10, max_measured_range)).toThrow(RangeError)
    })
})
