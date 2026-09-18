import { expect, describe, it } from 'vitest'
import { Buffer } from 'buffer'
import { generateEntropy } from './entropyGenerator'
import { normalize } from './normalizer'

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

    it('Does not mutate the input array', () => {
        const param = [1, 170, 55, 80, 190]
        generateEntropy(param)
        expect(param).toEqual([1, 170, 55, 80, 190])
    })

    it('Accepts a frozen input array', () => {
        const param = Object.freeze([1, 170, 55, 80, 190])
        expect(() => generateEntropy(param)).not.toThrow()
        const generatedEntropy = generateEntropy(param)
        expect(generatedEntropy).toBeInstanceOf(Buffer)
        expect(generatedEntropy.length).toBe(5)
    })

    it('Length 0 returns an empty Buffer', () => {
        expect(generateEntropy([1, 170, 55, 80, 190], 0).length).toBe(0)
    })

    it('Negative length throws RangeError', () => {
        expect(() => generateEntropy([1, 170], -1)).toThrow(RangeError)
    })

    it('Fractional length throws TypeError', () => {
        expect(() => generateEntropy([1, 170], 2.5)).toThrow(TypeError)
    })

    it('NaN length throws TypeError', () => {
        expect(() => generateEntropy([1, 170], NaN)).toThrow(TypeError)
    })

    it('Output bytes are within 0-255', () => {
        const generatedEntropy = generateEntropy([1, 170, 55, 80, 190])
        expect(generatedEntropy.every((byte) => byte >= 0 && byte <= 255)).toBe(true)
    })

    it('Works chained after normalize', () => {
        const entropy = generateEntropy(normalize([-2000, -15000, 300, 400, 1500]))
        expect(entropy).toBeInstanceOf(Buffer)
        expect(entropy.length).toBe(5)
    })
})
