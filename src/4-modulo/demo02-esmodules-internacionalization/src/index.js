import database from '../database.json' assert { type: 'json' }
import TerminalController from './terminalController.js'
import Person from './person.js'
import { save } from './repository.js'

const DEFAULT_LANGUAGE = 'pt-br'
const STOP_TERM = ':q'
const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)


async function mainLoop() {
    try {
        const answer = await terminalController.question('Type your command: ')
        console.log('You typed: ', answer)

        if (answer === STOP_TERM) {
            terminalController.closeTerminal()
            console.log('Process ended')
            return
        }
        const person = Person.generateInstanceFromString(answer)
        terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))

        save(person)
        return mainLoop()
    } catch (error) {
        console.log('Error: ', error)
        return mainLoop()
    }
}

await mainLoop()
