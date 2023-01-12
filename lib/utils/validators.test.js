import { expect, describe, it } from 'vitest'
import { isArrayOfIntegers } from './validators'

describe.concurrent('Generate Entropy', () => {
    it('All good case', () => {
        const param = [1, 170, 55, 80, 190]
        expect(isArrayOfIntegers(param)).toBeTruthy()
    })

    it('No param', () => {
        expect(() => isArrayOfIntegers()).toThrow('Parameter of generateEntropy function was not set.')
    })

    it('Not array param', () => {
        const param = 'A wrong type of parameter.'
        expect(() => isArrayOfIntegers(param)).toThrow('Parameter of generateEntropy should be an Array.')
    })

    it('Not integer array param (string array)', () => {
        const param = ['A', 'wrong', 'type', 'of', 'parameter', '.']
        expect(() => isArrayOfIntegers(param)).toThrow('Parameter of generateEntropy should be an Array of Integer.')
    })

    it('Not integer array param (integer in strings array)', () => {
        const param = ['0', '1', '2', '3', '4', '5']
        expect(() => isArrayOfIntegers(param)).toThrow('Parameter of generateEntropy should be an Array of Integer.')
    })
})
