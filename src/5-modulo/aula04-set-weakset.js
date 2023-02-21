const assert = require('assert')

const arr1 = [0, 1, 2]
const arr2 = [2, 0, 3]


const arr3 = arr1.concat(arr2)
assert.deepStrictEqual(arr3, [0, 1, 2, 2, 0, 3])


const set = new Set([...arr1, ...arr2])
// console.log(set)

assert.deepStrictEqual(Array.from((set)), [0, 1, 2, 3])
// console.log(set.keys())
// console.log(set.values()) // so existe por conta do map

assert.ok(set.has(3))

// mesma teoria do map, mas nao tem voce sempre trabalha com a lista toda
// nao tem get, entao, voce pode saber se o item esta ou nao no set e é isso
// na documentacao tem um exemplos de como fazer uma interacao, saber o que tem em uma lista e nao
// tem na outra, etc

//tem nos dois arrays

const users01 = new Set([
    'erick',
    'mariazinha',
    'xuxadasilva'
])

const users02 = new Set([
    'joaozinho',
    'erick',
    'julio'
])

const intersection = new Set([...users01].filter(user => users02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['erick'])

const difference = new Set([...users01].filter(user => !users02.has(user)))
assert.deepStrictEqual(Array.from(difference), ['mariazinha', 'xuxadasilva'])

// weakset

// mesma ideia do weakmap
// nao e enumeravel
// so trabalha com chaves como referencia
// so tem metodos simples

const user1 = { id: 123 }
const user2 = { id: 123 }

const weakSet = new WeakSet([user1])

weakSet.add(user2)
weakSet.delete(user2)
weakSet.has(user2)


