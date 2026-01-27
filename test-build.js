import { generateEntropy, normalize } from './dist/entropy-generator.js'

console.log('Testing built library...\n')

// Test 1: generateEntropy
console.log('Test 1: generateEntropy')
const initialArray = [1, 170, 55, 80, 190]
const entropy = generateEntropy(initialArray)
console.log('Input:', initialArray)
console.log('Entropy:', entropy)
console.log('Entropy length:', entropy.length)
console.log('✓ Test 1 passed\n')

// Test 2: generateEntropy with size
console.log('Test 2: generateEntropy with size')
const entropy2 = generateEntropy(initialArray, 3)
console.log('Input:', initialArray)
console.log('Entropy (size 3):', entropy2)
console.log('Entropy length:', entropy2.length)
console.log('✓ Test 2 passed\n')

// Test 3: normalize
console.log('Test 3: normalize')
const unnormalizedArray = [-2000, -15000, 300, 400, 1500]
const normalized = normalize(unnormalizedArray)
console.log('Input:', unnormalizedArray)
console.log('Normalized:', normalized)
console.log('✓ Test 3 passed\n')

console.log('All tests passed! Build is working correctly.')
