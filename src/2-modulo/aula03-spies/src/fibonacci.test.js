const sinon = require('sinon')
const assert = require('assert')
const Fibonacci = require('./fibonacci')

;(async () => {
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        for await (const i of fibonacci.execute(3)) {
        }

        const expectedCallCount = 4
        assert.deepStrictEqual(spy.callCount, expectedCallCount)
    }
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        const [...results] = fibonacci.execute(5)

        const { args } = spy.getCall(2)
        const expectedResult = [0, 1, 1, 2, 3]
        const expectedParams = Object.values({
            input: 3,
            current: 1,
            next: 2
        })

        assert.deepStrictEqual(args, expectedParams)
        assert.deepStrictEqual(results, expectedResult)
    }
})()

/*
* generators retorna interators, (.next)
* existem 3 formas de ler os dados
* usando as funcoes .next, for await e rest/spread
* */
