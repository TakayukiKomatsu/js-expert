const assert = require('assert')

const myMap = new Map()
myMap.set(1, 'one').set('Erick', { text: 'two' }).set(true, () => 'Hello')

const myMapwithContrutor = new Map([['1', 'one'], ['Erick', { text: 'Hello World' }], [true, () => 'Hello']])

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'Hello')

// em objetos, a chave so pode ser string ou symbol

const onlyReferenteWorks = {
    id: 1
}

myMap.set(onlyReferenteWorks, { name: 'Erick Wendel' })
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenteWorks), { name: 'Erick Wendel' })

// Utilitarios:
// - No objeto, temos o Object.keys, Object.values, Object.entries
// - No Map, temos o .keys(), .values(), .entries()

assert.deepStrictEqual(myMap.size, 4)
assert.ok(myMap.has(onlyReferenteWorks))
assert.ok(myMap.delete(onlyReferenteWorks))

// Nao da para interar em Objects diretamente

assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, 'one'], ['Erick', { 'text': 'two' }], [true, () => {
}]]))


// for (const [key, value] of myMap) {
//     console.log({ key, value })
// }

// qualquer chave pode colidir, com as proprieodades do herdadas do Object, como constructor, tostring,valueOf, etc

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// --- WeakMap
// Pode ser coletado quando o endereco de memória sair do contexto
// Tem a maioria dos Beneficios do Map, mas nao tem os metodos de interacao
// So tem chaves de referenciae que voce ja conheca
// mais leve e prevem memory leak, pq depois das instâncias sairem do contexto, elas sao coletadas, tudo e limpo

// const weakMap = new WeakMap()
//
// const hero = { name: 'Flash' }
// weakMap.set(hero, { power: 'Speed' })
// weakMap.get(hero)
// weakMap.delete(hero)
