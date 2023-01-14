import { expect, describe, it } from 'vitest'
import { Buffer } from 'buffer'
import { generateEntropy } from './entropyGenerator'

describe.concurrent('Generate Entropy', () => {
    it('All good case', () => {
        const param = [1, 170, 55, 80, 190]
        expect(generateEntropy(param)).toBeInstanceOf(Buffer)
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
})
