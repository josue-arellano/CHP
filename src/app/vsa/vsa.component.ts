import { Component, OnInit } from '@angular/core'
import { Course } from '../monthly-calendar/helper-classes/course'
import { FormGroup, FormControl } from '@angular/forms'
import * as _moment from 'moment'

const moment = _moment

@Component({
    selector: 'vsa',
    templateUrl: './vsa.component.html',
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

    testForm = new FormControl('')
    constructor() {}

    test():void {
        console.log(this.hoursPerWeekForm.value);
    }
}