const { rejects, deepStrictEqual } = require('assert')

const { error } = require('./src/constants')
const File = require('./src/file')

;(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                name: 'Erick Wendel',
                id: 123,
                profession: 'Javascript Instructor',
                birthday: 1998
            },
            {
                name: 'Xuxa da Silva',
                id: 321,
                profession: 'Javascript Specialist',
                birthday: 1943
            },
            {
                name: 'Joaozinho',
                id: 231,
                profession: 'Java developer',
                birthday: 1993
            }
        ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()
