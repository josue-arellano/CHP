import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Course } from '../../monthly-calendar/helper-classes/course'

@Component({
    selector: 'supervised-study',
    template: '<div>test</div>',
})
export class SupervisedStudyComponent {
    classSchedule: Course[] []
    constructor() {}

    updateClassSchedule($event) {
        this.classSchedule = $event
    }
}
