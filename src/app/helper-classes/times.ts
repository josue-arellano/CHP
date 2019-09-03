export class Times {
    times: string[] = []
    hours: string[] = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
    ]

    minutes: string[] = [
        '00',
        '05',
        '10',
        '15',
        '20',
        '25',
        '30',
        '35',
        '40',
        '45',
        '50',
        '55'
    ]

    period: string[] = [
        'AM',
        'PM'
    ]

    constructor() {
        this.period.forEach(period => {
            this.hours.forEach(hour => {
                this.minutes.forEach(minute => {
                    let time = hour + ":" + minute + period
                    this.times.push(time)
                })
            }) 
        });
    }

    getTimes(): string[] {
        return this.times
    }
}