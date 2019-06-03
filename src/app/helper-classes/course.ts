import * as _moment from 'moment'
import { Moment } from 'moment'
const moment = _moment

export class Course {
    courseName: string
    courseDesc: string
    courseNum: string
    daysString: string
    startTime: Moment
    endTime: Moment
    startDate: Moment
    endDate: Moment
    variableSchedule: boolean
    onlineClass: boolean
    lab: boolean
    totalWeeklyHours = moment.duration()
    totalWeeklyHrsString:string
    dailyTime = moment.duration()
    hoursPerDayOfWeek: any[]

    constructor (
        courseName,
        courseDesc,
        courseNum,
        variableSchedule,
        daysOfWeek,
        meetingDates,
        meetingTimes,
        lab,
        onlineClass,
        hoursPerDayOfWeek?
    ){
        this.courseName = courseName
        this.courseDesc = courseDesc
        this.courseNum = courseNum
        this.variableSchedule = variableSchedule
        this.daysString = daysOfWeek
        this.lab = lab
        this.onlineClass = onlineClass
        this.setMeetingDates(meetingDates)
        if(meetingTimes.length >= 0) {
            if(meetingTimes.includes("Hr")) {
                this.variableSchedule = true
                this.totalWeeklyHrsString = meetingTimes
            }
            else this.setInclassTimes(meetingTimes)
        }
        if(hoursPerDayOfWeek) {
            this.hoursPerDayOfWeek = hoursPerDayOfWeek
            this.setVariableTimes()
        }
    }

    setMeetingDates(meetingDates: string) {
        let dates = meetingDates.split('-',2)
        this.startDate = moment(dates[0], "MM/DD/YYYY")
        this.endDate = moment(dates[1], "MM/DD/YYYY")
    }

    setInclassTimes(meetingTimes: string) {
        let times = meetingTimes.split('-',2)
        this.startTime = moment(times[0], "hh:mmA")
        this.endTime = moment(times[1], "hh:mmA")
        this.dailyTime = moment.duration(this.endTime.diff(this.startTime))
        this.setHoursPerDayOfWeek(this.dailyTime)
    }

    setHoursPerDayOfWeek(dailyTime) {
        this.hoursPerDayOfWeek = new Array(7)
        let days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        for(let i = 0; i < days.length; i++) {
            if(this.daysString.indexOf(days[i]) >= 0) {
                this.hoursPerDayOfWeek[i] = dailyTime
                this.totalWeeklyHours.add(dailyTime)
            }
        }
        this.setTotalWeeklyHoursString()
    }

    setTotalWeeklyHoursString() {
        this.totalWeeklyHrsString = this.totalWeeklyHours.hours()
            + "Hr "
            + this.totalWeeklyHours.minutes()
            + "Min"
    }

    setVariableTimes() {
        for(let i = 0; i < this.hoursPerDayOfWeek.length; i++) {
            this.totalWeeklyHours.add(this.hoursPerDayOfWeek[i])
        }
        this.setTotalWeeklyHoursString()
    }
}