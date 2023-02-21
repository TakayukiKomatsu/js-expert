// Garantir semantica e seguranca em objetos

const assert = require('assert')

const myObj = {
    add(value) {
        return this.arg1 + this.arg2 + value
    }
}

// Function.prototype.apply = () => {
//     throw new TypeError('You are not allowed to change this function')
// }

// assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)


// um problema que pode acontecer (raro)
/// function.prototype.apply = () => { throw new TypeError('You are not allowed to change this function') }

// esse aqui pode acontecer:
myObj.add.apply = function() {
    throw new TypeError('Vixxx')
}

assert.throws(() => myObj.add.apply({}, []), {
    name: 'TypeError',
    message: 'Vixxx'
})


// Usando Reflect

const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)


// --- apply

// --- defineProperty

// questoes semanticas
function MyDate() {
}

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey There' })

Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey Dude' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey There')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey Dude')

// --- deleteProperty

const withDelete = { user: 'ErickWendel' }
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'ErickWendel' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)


// --- get
// Deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual(1['userName'], undefined)
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// -- has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))

// --- ownKeys
const user = Symbol('user')
const databaseUser = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'ErickWendel'
}
const ojbKeys = [...Object.getOwnPropertyNames(databaseUser), ...Object.getOwnPropertySymbols(databaseUser)]
assert.deepStrictEqual(ojbKeys, ['id', Symbol.for('password'), user])
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])


