const assert = require('assert')

const uniqueKey = Symbol('userName')
const user = {}
user['username'] = 'Value for normal objects'
user[uniqueKey] = 'Value for Symbol'


// console.log(user.username)
// sempre unico em nivel de endereco de memoria
// console.log(user[Symbol('userName')])


assert.deepStrictEqual(user.username, 'Value for normal objects')

//sempre unico em nivel de endereco de memoria
assert.deepStrictEqual(user[Symbol('userName')], undefined)
assert.deepStrictEqual(user[uniqueKey], 'Value for Symbol')

// é dificil de pegar, mas não secreto
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// bypass _ ma pratica (nem tem no codebase no node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)

// well known symbols

const obj = {
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop()
            }
        }
    })
}

// for (const item of obj) {
//     console.log('item', item)
// }


assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')

class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }

    get [Symbol.toStringTag]() {
        return 'WHAT?'
    }

    * [Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item
        }
    }

    async* [Symbol.asyncIterator]() {
        const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
        for (const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== 'string') throw new TypeError()

        const items = this[kItems].map(item => new Intl.DateTimeFormat('pt-BR', {
            month: 'long',
            day: '2-digit',
            year: 'numeric'
        }).format(item))


        return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
    }
}

const myDate = new MyDate([2020, 01, 01], [2018, 02, 02])
const expectedDates = [
    new Date(2020, 01, 01),
    new Date(2018, 02, 02)
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
assert.throws(() => myDate + 1, TypeError)
assert.deepStrictEqual(String(myDate), '01 de fevereiro de 2020 e 02 de março de 2018')


// implementarr o interator
assert.deepStrictEqual([...myDate], expectedDates)

;(async () => {
    const dates = await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
})()
