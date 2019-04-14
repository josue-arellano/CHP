import { Component } from '@angular/core'
import { MatDatepicker, MatDialog } from '@angular/material'
import { FormControl } from '@angular/forms'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import * as _moment from 'moment'
import { Moment } from 'moment'
import { Day } from './helper-classes/day'
import { Course } from './helper-classes/course'
import { DayPopUpComponent } from './day-pop-up/day-pop-up.component'
const moment = _moment

export const MY_FORMATS = {
    parse: {
        dateInput: 'MMMM YYYY'
    },
    display: {
        dateInput: 'MMMM YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
}
@Component({
    selector: 'monthly-calendar',
    templateUrl: './monthly-calendar.component.html',
    styleUrls: ['./monthly-calendar.component.css', './../component-styles.css'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
    ]     
})
export class MonthlyCalendarComponent {

    date = new FormControl(moment())
    formattedDate = this.date.value.format('MMMM YYYY')
    daysRow1Val:number[] = []
    daysRow1Head:number[] = []
    daysRow2Val:number[] = []
    daysRow2Head:number[] = []
    days1:Day[] = []
    days2:Day[] = []
    nil = "0:00"
    total = moment.duration()
    totalString: string
    classSchedule: Course[] = []

    constructor(public dialog: MatDialog) {}

    ngOnInit() {
        for(let i = 0; i < 16; i++) {
            this.daysRow1Head[i] = i + 1
            var thisDay = (i+1).toString() + "/" + this.date.value.format("MM/YYYY")
            this.days1[i] = new Day(thisDay)
        }
        for(let i = 0; i < 15; i++) {
            this.daysRow2Head[i] = i + 17
            var thisDay = (i + 17).toString() + "/" + this.date.value.format("MM/YYYY")
            this.days2[i] = new Day(thisDay)         
            console.log(this.days2[i]);
        }
        this.totalString = this.nil
    }

    updateClassSchedule($event) {
        this.classSchedule = $event
        this.updateDays()
    }

    chosenYearHandler(normalizedYear: Moment) {
        const ctrlValue = this.date.value
        ctrlValue.date(1)
        ctrlValue.year(normalizedYear.year())
        this.date.setValue(ctrlValue)
    }
    
    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value
        ctrlValue.month(normalizedMonth.month())
        datepicker.close()
        this.date.setValue(ctrlValue)
        this.updateDays()
    }

    updateDays() {
        this.total = moment.duration({
            days: 0,
            hours: 0,
            minutes: 0
        })
        for(let i = 0; i < this.days1.length; i++) {
            let todayRow1 = this.days1[i]
            todayRow1.resetDate(i+1, this.date.value)
            for(let j = 0; j < this.classSchedule.length; j++) {
                todayRow1.add(this.classSchedule[j])
            }
            this.total.add(todayRow1.totalHours)
            if(i < this.days2.length) {
                let todayRow2 = this.days2[i]
                todayRow2.resetDate(i+17, this.date.value)
                for(let j = 0; j < this.classSchedule.length; j++) {
                    if(todayRow2.date.month() === this.date.value.month())todayRow2.add(this.classSchedule[j])
                }
                this.total.add(todayRow2.totalHours)
            }
        }
        this.updateTotal()
    }

    updateTotalAfterRemove() {
        this.total = moment.duration({
            days: 0,
            hours: 0,
            minutes: 0
        })
        for(let i = 0; i < this.days1.length; i++) {
            this.total.add(this.days1[i].totalHours)
            if(i < this.days2.length) this.total.add(this.days2[i].totalHours)
        }
        this.updateTotal()
    }

    updateTotal() {
        let totalMinutes = this.total.minutes().toString()
        if(+totalMinutes < 10) totalMinutes = "0".concat(totalMinutes.toString())
        let totalHours = (this.total.days() * 24 + this.total.hours())
        if(+totalMinutes === 0) this.totalString = totalHours.toString()
        else this.totalString = "".concat(totalHours.toString() + ":" + totalMinutes)
    }

    openDay1(date: number): void {
        const dialogRef = this.dialog.open(DayPopUpComponent, {
            data: this.days1[date].courses
        })

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.days1[date].updateCourses(result)
                this.updateTotalAfterRemove()
            }
        })
    }

    openDay2(date: number): void {
        const dialogRef = this.dialog.open(DayPopUpComponent, {
            data: this.days2[date].courses
        })
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.days2[date].updateCourses(result)
                this.updateTotalAfterRemove()
            }
        })
    }
}