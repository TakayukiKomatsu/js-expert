export default class Person {
    constructor({ id, vehicles, kmTravelled, from, to }) {
        this.id = id
        this.vehicles = vehicles
        this.kmTravelled = kmTravelled
        this.from = from
        this.to = to
    }

    static generateInstanceFromString(text) {
        const separator = ' '
        const [id, vehicles, kmTravelled, from, to] = text.split(separator)
        return new Person({ id, vehicles: vehicles.split(','), kmTravelled, from, to })
    }

    formatted(language) {
        const mapDate = (date) => {
            const [year, month, day] = date.split('-').map(Number)
            return new Date(year, month - 1, day)
        }
        return {
            id: Number(this.id),
            vehicles: new Intl.ListFormat(language, { style: 'long', type: 'conjunction' }).format(this.vehicles),
            kmTravelled: new Intl.NumberFormat(language, { style: 'unit', unit: 'kilometer' }).format(this.kmTravelled),
            from: new Intl.DateTimeFormat(language, {
                month: 'long',
                day: '2-digit',
                year: 'numeric'
            }).format(mapDate(this.from)),
            to: new Intl.DateTimeFormat(language, {
                month: 'long',
                day: '2-digit',
                year: 'numeric'
            }).format(mapDate(this.to))
        }
    }
}
