import { Component, OnInit } from '@angular/core'
import { Course } from '../monthly-calendar/helper-classes/course'
import { FormGroup, FormControl } from '@angular/forms'
import * as _moment from 'moment'

const moment = _moment
const zero = moment.duration({
    minutes: 0
})

@Component({
    selector: 'vsa',
    templateUrl: './vsa.component.html',
    styleUrls: ['../app.component.css', './vsa.component.css']
})
export class VSAComponent{
    hoursPerWeekForm = new FormGroup({
        classTime: new FormControl(''),
        supervisedStudy: new FormControl(''),
        unsupervisedStudy: new FormControl(''),
        workstudy: new FormControl(''),
        commService: new FormControl(''),
        workshops: new FormControl('')
    })
    totalHours: String
    classSchedule: Course[] = []

    constructor() {}

    updateClassSchedule($event) {
        this.classSchedule = $event
        console.log("in updateClassSchedule()")
        this.calculateClassTime()
        this.calculateTotal()
    }

    calculateClassTime() {
        let classTime = moment.duration({
            minutes: 0
        })
        for(var i = 0; i < this.classSchedule.length; i++) {
            if(!this.classSchedule[i].lab)
                classTime.add(this.classSchedule[i].totalWeeklyHours)
        }
        let hours = Math.floor(classTime.asHours())
        let minutes = classTime.minutes() < 10 ? "0" + classTime.minutes() : classTime.minutes()
        let timeString = Math.floor(classTime.asHours()) + ":" + classTime.minutes()
        this.hoursPerWeekForm.get("classTime").setValue(timeString)
        if(classTime.asMinutes() === 0) this.hoursPerWeekForm.get("classTime").setValue("")
    }

    supervisedStudyEvent($event) {
        this.hoursPerWeekForm.get('supervisedStudy').setValue($event)
        this.calculateTotal()
    }

    calculateTotal():void {
        let classTimeString = this.hoursPerWeekForm.get('classTime').value
        let total = this.parseHours(classTimeString)

        let supervisedStudyString = this.hoursPerWeekForm.get('supervisedStudy').value
        total.add(this.parseHours(supervisedStudyString))

        let unsupervisedStudyString = this.hoursPerWeekForm.get('unsupervisedStudy').value
        total.add(this.parseHours(unsupervisedStudyString))

        let workstudyString = this.hoursPerWeekForm.get('workstudy').value
        total.add(this.parseHours(workstudyString))

        let commServiceString = this.hoursPerWeekForm.get('commService').value
        total.add(this.parseHours(commServiceString))

        let workshopsString = this.hoursPerWeekForm.get('workshops').value
        total.add(this.parseHours(workshopsString))

        let hours = Math.floor(total.asHours())
        let minutes = total.minutes() >= 10 ? total.minutes() : "0" + total.minutes()
        this.totalHours = hours + ":" + minutes
    }

    // used to convert the input string into a moment
    parseHours(hourString: string): any {
        let hours
        let minutes
        if(hourString.length == 0) {
            return moment.duration({
                minutes: 0
            })
        } else if(hourString.length == 1) {
            return moment.duration({ hours: parseInt(hourString) })
        } else if(hourString.length == 5) {
            hours = hourString.substring(0, 2)
            minutes = hourString.substring(3);
        } else {
            hours = hourString.substring(0,1)
            minutes = hourString.substring(2)
        }
        console.log("hours: " + hours + ", minutes: " + minutes)
        return moment.duration({
            minutes: parseInt(minutes),
            hours: parseInt(hours)
        })
    }
}