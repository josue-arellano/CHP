import { Component, Inject, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Course } from '../../helper-classes/course'
import { Times } from '../../../helper-classes/times'
import * as _moment from 'moment'
import { Moment } from 'moment'

const moment = _moment
const days = ['sun', 'mon','tue','wed','thu','fri', 'sat']

function checkedBoxValidator(control: FormGroup) {
    let day = control.get('day')
    let hours = control.get('hours')
    if(day.value && !hours.value) return {
        missingHours: {
            parsedHours: hours
        }
    }
    return null
}

function typeOfCourse(control: FormGroup) {
    let isOnline = control.get('onlineCourse').value
    if(!isOnline) {
        let startTime = control.get('inclassForm').get('startTime').value
        let endTime = control.get('inclassForm').get('endTime').value
        if(startTime && endTime) {
            let start = moment(startTime, "hh:mmA")
            let end = moment(endTime, "hh:mmA")
            console.log('start: ' + start + ', end: ' + end)
            if(start > end) return {
                incorrectTimes: {
                    start: start,
                    end: end
                }
            }
        } else {
            return {
                missingHours: {
                    start1: startTime,
                    end1: endTime,
                }
            }
        }
        let daysOfWeek = new Array(7)
        for(var i = 0; i < days.length; i++) {
            daysOfWeek[i] = control.get('inclassForm').get(days[i]).value
        }
        if(!daysOfWeek[0] && !daysOfWeek[1] && !daysOfWeek[2] && !daysOfWeek[3] && !daysOfWeek[4] && !daysOfWeek[5] && !daysOfWeek[6]) return {
            missingDaysOfWeek : {
                sun: days[0], mon: days[1], tue: days[2], wed: days[3], thu: days[4], fri: days[5], sat: days[6]
            }
        }
    } else {
        let daysOfWeek = new Array(7)
        for(var i = 0; i < days.length; i++) {
            daysOfWeek[i] = control.get('onlineForm').get(days[i]).get('day').value
        }
        if(!daysOfWeek[0] && !daysOfWeek[1] && !daysOfWeek[2] && !daysOfWeek[3] && !daysOfWeek[4] && !daysOfWeek[5] && !daysOfWeek[6]) return {
            missingDaysOfWeek : {
                sun: days[0], mon: days[1], tue: days[2], wed: days[3], thu: days[4], fri: days[5], sat: days[6]
            }
        }
    }
    return null
}

function correctDates(control: FormGroup) {
    let startDate = control.get('startDate')
    let endDate = control.get('endDate')
    if(startDate.touched && endDate.value <= startDate.value) return {
        incorrectDates: {
            start: startDate,
            end: endDate
        }
    }
}

@Component({
    selector: 'manual-course-form',
    templateUrl: './manual-course-form.component.html',
    styleUrls: ['./manual-course-form.component.css', '../../../component-styles.css']
})
export class ManualCourseComponent {
    TimeArr: Times = new Times 

    times: string[] = this.TimeArr.getTimes()
    
    disabled = true

    @Output() newCourseInput: EventEmitter<Course> = new EventEmitter()

    courseForm = new FormGroup({
        courseNum: new FormControl('', [
            Validators.pattern('[1-9][0-9][0-9][0-9][0-9]')
        ]),
        courseName: new FormControl(''),
        onlineCourse: new FormControl(false),
        onlineForm: new FormGroup({
            mon: new FormGroup ({
                day: new FormControl(false),
                    hours: new FormControl('', [
                    Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
                ]),
            }, [ checkedBoxValidator ]),
            tue: new FormGroup ({
                day: new FormControl(false),
                hours: new FormControl('', [
                    Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
                ]),
            }, [ checkedBoxValidator ]),
            wed: new FormGroup ({
                day: new FormControl(false),
                hours: new FormControl('', [
                    Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
                ]),
            }, [ checkedBoxValidator ]),
            thu: new FormGroup ({
                day: new FormControl(false),
                hours: new FormControl('', [
                    Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
                ]),
            }, [ checkedBoxValidator ]),
            fri: new FormGroup ({
                day: new FormControl(false),
                hours: new FormControl('', [
                    Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
                ]),
            }, [ checkedBoxValidator ]),
            sat: new FormGroup ({
                day: new FormControl(false),
                hours: new FormControl('', [
                    Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
                ]),
            }, [ checkedBoxValidator ]),
            sun: new FormGroup ({
                day: new FormControl(false),
                hours: new FormControl('', [
                    Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
                ]),
            }, [ checkedBoxValidator ]),
        }),
        inclassForm: new FormGroup({
            mon: new FormControl(false),
            tue: new FormControl(false),
            wed: new FormControl(false),
            thu: new FormControl(false),
            fri: new FormControl(false),
            sat: new FormControl(false),
            sun: new FormControl(false),
            startTime: new FormControl(),
            endTime: new FormControl(),
        }),
        startDate: new FormControl(),
        endDate: new FormControl()
    }, [ typeOfCourse, correctDates ])

    online=false

    constructor(public dialogRef: MatDialogRef<ManualCourseComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Course) {}

    addCourse(): void {
        let daysOfWeek = this.getDaysOfWeek()
        let meetingTime: string
        let meetingDates = this.getMeetingDates()
        let course: Course
        if(this.courseForm.get('onlineCourse').value) {
            meetingTime = ''
            course = new Course(
                this.courseForm.get('courseName').value,
                '',
                this.courseForm.get('courseNum').value,
                this.courseForm.get('onlineCourse').value,
                daysOfWeek,
                meetingDates,
                meetingTime,
                false,
                true,
                this.getDailyTimes()
            ) 
        } else {
            meetingTime = this.getMeetingTime()
            course = new Course(
                this.courseForm.get('courseName').value,
                '',
                this.courseForm.get('courseNum').value,
                this.courseForm.get('onlineCourse').value,
                daysOfWeek,
                meetingDates,
                meetingTime,
                false,
                false
            )
        }
        this.dialogRef.close(course)
    }

    getDaysOfWeek(): string {
        var daysOfWeek: string = ""
        if(this.courseForm.get('onlineCourse').value) {
            for(let i = 0; i < days.length; i++) {
                if(this.courseForm.get('onlineForm').get(days[i]).get('day').value)
                        daysOfWeek += days[i].charAt(0).toUpperCase() + days[i].charAt(1)
            }
        } else {
            for(let i = 0; i < days.length; i++) {
                if(this.courseForm.get('inclassForm').get(days[i]).value)
                        daysOfWeek += days[i].charAt(0).toUpperCase() + days[i].charAt(1)
            }
        }
        return daysOfWeek
    }

    getMeetingTime(): string {
        var meetingTime = this.courseForm.get('inclassForm').get('startTime').value
                            + "-"
                            + this.courseForm.get('inclassForm').get('endTime').value
        return meetingTime
    }

    getDailyTimes(): any[] {
        var dailyTimes = new Array(7)
        for(let i = 0; i < dailyTimes.length; i++) {
            if(this.courseForm.get('onlineForm').get(days[i]).get('day').value) {
                let time = this.courseForm.get('onlineForm').get(days[i]).get('hours').value
                dailyTimes[i] = moment.duration({
                    minutes: time.substring(2),
                    hours: time.substring(0,1)
                })
            }
        }
        return dailyTimes
    }

    getMeetingDates(): string {
        var startDate = moment(this.courseForm.get('startDate').value).format('MM/DD/YYYY')
        var endDate = moment(this.courseForm.get('endDate').value).format('MM/DD/YYYY')
        return startDate + "-" + endDate
    }

    clearCourseInfo() {
        if (this.courseForm.get('onlineCourse').value) {
            this.courseForm.get('inclassForm').reset()
        } else {
            this.courseForm.get('onlineForm').reset()
        }
    }
}