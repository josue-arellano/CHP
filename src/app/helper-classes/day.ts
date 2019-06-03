import * as _moment from 'moment'
import { Moment } from 'moment'
import { Course } from './course'
const moment = _moment

export class Day {
    date: Moment
    holiday: boolean
    courses: Course[]
    dayOfWeek: string
    totalHours = moment.duration({hours: 0, minutes: 0})
    totalString: string

    constructor(date: string) {
        this.date = moment(date, "D/MM/YYYY")
        this.courses = []
        this.calculateTotalHours()
        this.holiday = false
    }

    add(course: Course) {
        if(this.matches(course)) {
            this.courses = this.courses.concat(course)
        }
        this.calculateTotalHours()
    }

    updateCourses(courses) {
        this.courses = courses
        this.calculateTotalHours()
    }

    resetDate(day: number, monthYear: Moment) {
        this.courses = []
        this.totalHours = moment.duration()
        this.date = monthYear.clone()
        this.date.date(day)
    }

    matches(course: Course): boolean {
        let before = this.date.isSameOrAfter(course.startDate)
        let after = this.date.isSameOrBefore(course.endDate)
        let dayOfWeek = course.hoursPerDayOfWeek[this.date.weekday()]
        let contains = this.courses.includes(course)
        return before && after && dayOfWeek && !contains
    }

    calculateTotalHours() {
        this.totalHours = moment.duration({hours: 0, minutes: 0})
        for(let course of this.courses) {
            this.totalHours.add(course.hoursPerDayOfWeek[this.date.weekday()])
        }
        var totalMinutes = this.totalHours.minutes().toString()
        if(+totalMinutes < 10) totalMinutes = "0".concat(totalMinutes.toString())
        this.totalString = "".concat(this.totalHours.hours() + ":" + totalMinutes)
    }
}