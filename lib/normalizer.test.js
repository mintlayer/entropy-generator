import { expect, describe, it } from 'vitest'
import { scaleValue, normalize } from './normalizer'

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

describe.concurrent('Normalize', () => {
    it('All items already within range 0-255', () => {
        const param = [1, 170, 55, 80, 190]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray.every((item) => item <= 255))
        expect(normalizedArray.every((item) => item >= 0))
    })

    it('Some items below range 0-255', () => {
        const param = [-3, -10, -400, 80, 190]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray.every((item) => item <= 255))
        expect(normalizedArray.every((item) => item >= 0))
    })

    it('Some items above range 0-255', () => {
        const param = [1, 170, 300, 400, 1500]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray.every((item) => item <= 255))
        expect(normalizedArray.every((item) => item >= 0))
    })

    it('All items below range 0-255', () => {
        const param = [-3, -10, -400, -80, -190]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray.every((item) => item <= 255))
        expect(normalizedArray.every((item) => item >= 0))
    })

    it('All items above range 0-255', () => {
        const param = [2000, 15000, 300, 400, 1500]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray.every((item) => item <= 255))
        expect(normalizedArray.every((item) => item >= 0))
    })

    it('All items are above or below range 0-255', () => {
        const param = [-2000, -15000, 300, 400, 1500]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray.every((item) => item <= 255))
        expect(normalizedArray.every((item) => item >= 0))
    })

    // validations
    it('No param', () => {
        expect(() => normalize()).toThrow(TypeError)
    })

    it('Not array param', () => {
        const param = 'A wrong type of parameter.'
        expect(() => normalize(param)).toThrow(TypeError)
    })

    it('Not integer array param (string array)', () => {
        const param = ['A', 'wrong', 'type', 'of', 'parameter', '.']
        expect(() => normalize(param)).toThrow(TypeError)
    })

    it('Not integer array param (integer in strings array)', () => {
        const param = ['0', '1', '2', '3', '4', '5']
        expect(() => normalize(param)).toThrow(TypeError)
    })

    it('Max and Min equals 0', () => {
        const param = ['10', '10']
        expect(() => normalize(param)).toThrow(Error)
    })
})

normalize
