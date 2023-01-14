import { expect, describe, it } from 'vitest'
import { Buffer } from 'buffer'
import { generateEntropy } from './entropyGenerator'

describe.concurrent('Generate Entropy', () => {
    it('All good case', () => {
        const param = [1, 170, 55, 80, 190]
        const generatedEntropy = generateEntropy(param)
        expect(generatedEntropy).toBeInstanceOf(Buffer)
        expect(generatedEntropy.length).toBe(param.length)
    })

    it('All good case with size set', () => {
        const param = [1, 170, 55, 80, 190]
        const generatedEntropy = generateEntropy(param, 3)
        expect(generatedEntropy).toBeInstanceOf(Buffer)
        expect(generatedEntropy.length).toBe(3)
    })

    // validations
    it('No param', () => {
        expect(() => generateEntropy()).toThrow(TypeError)
    })

    it('Not array param', () => {
        const param = 'A wrong type of parameter.'
        expect(() => generateEntropy(param)).toThrow(TypeError)
    })

    it('Not integer array param (string array)', () => {
        const param = ['A', 'wrong', 'type', 'of', 'parameter', '.']
        expect(() => generateEntropy(param)).toThrow(TypeError)
    })

    it('Not integer array param (integer in strings array)', () => {
        const param = ['0', '1', '2', '3', '4', '5']
        expect(() => generateEntropy(param)).toThrow(TypeError)
    })

    it('Wrong length type 1', () => {
        const param = [1, 170, 55, 80, 190]
        expect(() => generateEntropy(param, 'aa')).toThrow(TypeError)
    })

    it('Wrong length type 2', () => {
        const param = [1, 170, 55, 80, 190]
        expect(() => generateEntropy(param, {})).toThrow(TypeError)
    })

    it('Result length bigger than the limit', () => {
        const param = [1, 170, 55, 80, 190]
        expect(() => generateEntropy(param, 50)).toThrow(RangeError)
    })
})
