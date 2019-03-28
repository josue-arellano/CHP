import { Component, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Course } from '../../helper-classes/course'
import * as _moment from 'moment'

const moment = _moment
const days = ['sun','mon','tue','wed','thu','fri','sat']

function labFormErrors(control: FormGroup) {
    let startDate = control.get('startDate')
    let endDate = control.get('endDate')
    if(startDate && endDate && startDate.value > endDate.value) return {
        incorrectDates: {
            start: startDate.value,
            end: endDate.value
        }
    }
    if(startDate && endDate) {
        let daysOfWeek = new Array(7)
        for(var i = 0; i < days.length; i++) {
            daysOfWeek[i] = control.get(days[i]).value
        }
        if(!daysOfWeek[0] && !daysOfWeek[1] && !daysOfWeek[2] && !daysOfWeek[3] && !daysOfWeek[4] && !daysOfWeek[5] && !daysOfWeek[6]) return {
            missingDaysOfWeek : {
                sun: days[0], mon: days[1], tue: days[2], wed: days[3], thu: days[4], fri: days[5], sat: days[6]
            }
        }
    }
    return null
}

@Component({
    selector: 'manual-lab-form',
    templateUrl: './manual-lab-form.component.html',
    styleUrls: ['./manual-lab-form.component.css', '../../../component-styles.css']
})
export class ManualLabFormComponent {
    labForm = new FormGroup({
        mon: new FormControl(false),
        monHrs: new FormControl('', [
            Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
        ]),
        tue: new FormControl(false),
        tueHrs: new FormControl('', [
            Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
        ]),
        wed: new FormControl(false),
        wedHrs: new FormControl('', [
            Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
        ]),
        thu: new FormControl(false),
        thuHrs: new FormControl('', [
            Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
        ]),
        fri: new FormControl(false),
        friHrs: new FormControl('', [
            Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
        ]),
        sat: new FormControl(false),
        satHrs: new FormControl('', [
            Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
        ]),
        sun: new FormControl(false),
        sunHrs: new FormControl('', [
            Validators.pattern('([0-5]:[0-5][0-9]|6:00)')
        ]),
        startDate: new FormControl(),
        endDate: new FormControl()
    }, [ labFormErrors ])

    online = false;

    constructor(public dialogRef: MatDialogRef<ManualLabFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Course) {}

    addCourse(): void {
        var course = new Course (
            'CalWORKs Lab',
            'CalWORKs Lab',
            '00000',
            true,
            this.getDaysOfWeek(),
            this.getMeetingDates(),
            '',
            this.getDailyTimes()
        )
        this.dialogRef.close(course)
    }

    getDaysOfWeek(): string {
        var daysOfWeek = ""
        for(var i = 0; i < days.length; i++) {
            if(this.labForm.get(days[i]).value) {
                daysOfWeek += days[i].charAt(0).toUpperCase() + days[i].charAt(1)
            }
        }
        return daysOfWeek
    }

    getMeetingDates(): string {
        var startDate = moment(this.labForm.get('startDate').value).format('MM/DD/YYYY')
        var endDate = moment(this.labForm.get('endDate').value).format('MM/DD/YYYY')
        return startDate + "-" + endDate
    }

    getDailyTimes(): any[] {
        var dailyTimes = new Array(7)
        for(let i = 0; i < days.length; i++) {
            if(this.labForm.get(days[i]).value) {
                let time = this.labForm.get(days[i]+"Hrs").value
                dailyTimes[i] = moment.duration({
                    minutes: time.substring(2),
                    hours: time.substring(0,1)
                })
            }
        }
        return dailyTimes
    }
}