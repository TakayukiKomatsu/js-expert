import Person from './person.js'

import chalk from 'chalk'
import chalkTable from 'chalk-table'
import DraftLog from 'draftlog'
import readline from 'readline'


export default class TerminalController {
    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        const table = chalkTable(this.getTableOptions(), data)

        this.print = console.draft(table)
        this.data = data
    }

    initializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin)
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        this.initializeTable(database, language)
    }

    question(msg = '') {
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    updateTable(item) {
        this.data.push(item)
        this.print(chalkTable(this.getTableOptions(), this.data))
    }

    closeTerminal() {
        this.terminal.close()
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: 'id', name: chalk.cyan('ID') },
                { field: 'vehicles', name: chalk.magenta('Vehicles') },
                { field: 'kmTravelled', name: chalk.yellow('Km Travelled') },
                { field: 'from', name: chalk.green('From') },
                { field: 'to', name: chalk.green('To') }
            ]
        }
    }
}
