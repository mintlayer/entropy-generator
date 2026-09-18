import { expect, describe, it } from 'vitest'
import {
    isArrayOfIntegers,
    isNormalizedArray,
    isValueWithinTheRange,
    isLengthValid,
} from './validators'

describe.concurrent('Is Array of Integers', () => {
    it('All good case', () => {
        const param = [1, 170, 55, 80, 190]
        expect(isArrayOfIntegers(param)).toBeTruthy()
    })

    it('No param', () => {
        expect(() => isArrayOfIntegers()).toThrow(
            'Parameter param of isArrayOfIntegers function was not set.',
        )
    })

    it('Not array param', () => {
        const param = 'A wrong type of parameter.'
        expect(() => isArrayOfIntegers(param)).toThrow(
            'Parameter param of isArrayOfIntegers should be an Array.',
        )
    })

    it('Not integer array param (string array)', () => {
        const param = ['A', 'wrong', 'type', 'of', 'parameter', '.']
        expect(() => isArrayOfIntegers(param)).toThrow(
            'Parameter of generateEntropy should be an Array of Integer.',
        )
    })

    it('Not integer array param (integer in strings array)', () => {
        const param = ['0', '1', '2', '3', '4', '5']
        expect(() => isArrayOfIntegers(param)).toThrow(
            'Parameter of generateEntropy should be an Array of Integer.',
        )
    })
})

describe.concurrent('Is value within range', () => {
    it('All good case', () => {
        const param = 1
        const range = {
            max_measured_range: 255,
            min_measured_range: 0,
        }
        expect(isValueWithinTheRange(param, range)).toBeTruthy()
    })

    it('No param', () => {
        expect(() => isValueWithinTheRange()).toThrow(
            'Parameter undefined should be a number but is undefined.',
        )
    })

    it('Wrong type param', () => {
        expect(() => isValueWithinTheRange('myString')).toThrow(
            'Parameter myString should be a number but is string.',
        )
    })

    it('Above range param', () => {
        const param = 260
        const range = {
            max_measured_range: 255,
            min_measured_range: 0,
        }
        expect(() => isValueWithinTheRange(param, range)).toThrow(
            'Parameter 260 is above the specified range 0-255.',
        )
    })

    it('Below range param', () => {
        const param = -10
        const range = {
            max_measured_range: 255,
            min_measured_range: 0,
        }
        expect(() => isValueWithinTheRange(param, range)).toThrow(
            'Parameter -10 is below the specified range 0-255.',
        )
    })
})

describe.concurrent('Is normalized array', () => {
    it('All good case', () => {
        const param = [0, 50, 100, 150]
        expect(isNormalizedArray(param)).toBeTruthy()
    })

    it('No param', () => {
        expect(() => isNormalizedArray()).toThrow(
            'Parameter array of isNormalizedArray function was not set.',
        )
    })

    it('Wrong type param', () => {
        expect(() => isNormalizedArray('myString')).toThrow(
            'Parameter array of isNormalizedArray should be an Array.',
        )
    })

    it('Above range param', () => {
        const param = [0, 50, 100, 420]
        expect(() => isNormalizedArray(param)).toThrow('Array passed was not normalized.')
    })

    it('Below range param', () => {
        const param = [-20, 50, 100, 150]
        expect(() => isNormalizedArray(param)).toThrow('Array passed was not normalized.')
    })
})

describe.concurrent('Is length valid', () => {
    const param = [0, 50, 100, 150]

    it('All good case - no length', () => {
        expect(isLengthValid(param)).toBeTruthy()
    })

    it('All good case - same size', () => {
        expect(isLengthValid(param, param.length)).toBeTruthy()
    })

    it('All good case - smaller length', () => {
        expect(isLengthValid(param, param.length - 1)).toBeTruthy()
    })

    it('Wrong type param - string', () => {
        expect(() => isLengthValid(param, '')).toThrow(
            'Length parameter expected to be an integer number, got string.',
        )
    })

    it('Length bigger than limit', () => {
        expect(() => isLengthValid(param, param.length + 1)).toThrow(
            'The max result length is the length of the input (4).',
        )
    })
})
