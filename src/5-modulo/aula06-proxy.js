'use-strict'

const Event = require('events')
const event = new Event()
const eventName = 'Counter'

event.on(eventName, (msg) => {
    console.log('Counter:', msg)
})


const myCounter = {
    counter: 0
}

const proxy = new Proxy(myCounter, {
    set(target, propertyKey, newValue) {
        event.emit(eventName, { newValue, key: target[propertyKey] })
        target[propertyKey] = newValue

        return true
    },
    get: (obj, prop) => {
        // console.log('chamou!', { obj, prop })
        return obj[prop]
    }
})

const timer = setInterval(() => {
    proxy.counter += 1
    console.log('[3]: Interval')
    
    if (proxy.counter === 10) {
        clearInterval(timer)
    }
}, 200)

setTimeout(() => {
    proxy.counter = 4
    console.log('[2]: Timeout')
}, 0)

setImmediate(() => {
    proxy.counter = 4
    console.log('[1]: Imediate')
})

process.nextTick(() => {
    proxy.counter = 2
    console.log('[0]: Next tick')
})
