import { Component } from '@angular/core'

@Component({
    selector: 'monthly-calendar',
    templateUrl: './monthly-calendar.component.html',
    styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent {

    day = []

    constructor() {}
}