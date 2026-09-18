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

    // specific checks
    it('Specific 1', () => {
        const toScale = 80
        const scaledValue = scaleValue(toScale, 0, 100)
        expect(scaledValue).toBe(204)
    })

    it('Specific 2', () => {
        const toScale = 80
        const scaledValue = scaleValue(toScale, 50, 100)
        expect(scaledValue).toBe(153)
    })

    it('Specific 3', () => {
        const toScale = 0
        const scaledValue = scaleValue(toScale, 0, 255)
        expect(scaledValue).toBe(0)
    })

    it('Specific 4', () => {
        const toScale = 100
        const scaledValue = scaleValue(toScale, 0, 100)
        expect(scaledValue).toBe(255)
    })

    it('Specific 5', () => {
        const toScale = 99
        const scaledValue = scaleValue(toScale, 0, 100)
        expect(scaledValue).toBe(252)
    })

    it('Specific 6', () => {
        const toScale = 55
        const options = {
            max_required_range: 300,
            min_required_range: 100,
        }
        const scaledValue = scaleValue(toScale, 50, 100, options)
        expect(scaledValue).toBe(120)
    })

    it('Specific 7', () => {
        const toScale = 1
        const scaledValue = scaleValue(toScale, 0, 1)
        expect(scaledValue).toBe(255)
    })

    it('Specific 8', () => {
        const toScale = 155
        const options = {
            max_required_range: 10,
            min_required_range: 1,
        }
        const scaledValue = scaleValue(toScale, 100, 10000, options)
        expect(scaledValue).toBe(1)
    })

    it('Specific 9', () => {
        const toScale = 5000
        const scaledValue = scaleValue(toScale, 0, 50000)
        expect(scaledValue).toBe(26)
    })

    it('Specific 10', () => {
        const toScale = 100000
        const options = {
            max_required_range: 100000,
            min_required_range: 5000,
        }
        const scaledValue = scaleValue(toScale, 0, 1000000, options)
        expect(scaledValue).toBe(14500)
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
        expect(normalizedArray.every((item) => item <= 255)).toBe(true)
        expect(normalizedArray.every((item) => item >= 0)).toBe(true)
    })

    it('Some items below range 0-255', () => {
        const param = [-3, -10, -400, 80, 190]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray.every((item) => item <= 255)).toBe(true)
        expect(normalizedArray.every((item) => item >= 0)).toBe(true)
    })

    it('Some items above range 0-255', () => {
        const param = [1, 170, 300, 400, 1500]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray.every((item) => item <= 255)).toBe(true)
        expect(normalizedArray.every((item) => item >= 0)).toBe(true)
    })

    it('All items below range 0-255', () => {
        const param = [-3, -10, -400, -80, -190]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray).toStrictEqual([255, 251, 0, 206, 135])
    })

    it('All items above range 0-255', () => {
        const param = [2000, 15000, 300, 400, 1500]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray.every((item) => item <= 255)).toBe(true)
        expect(normalizedArray.every((item) => item >= 0)).toBe(true)
    })

    it('All items are above or below range 0-255', () => {
        const param = [-2000, -15000, 300, 400, 1500]
        const normalizedArray = normalize(param)

        expect(normalizedArray).not.toStrictEqual(param)
        expect(normalizedArray).toStrictEqual([201, 0, 236, 238, 255])
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
        const param = [10, 10]
        expect(() => normalize(param)).toThrow(Error)
    })
})
