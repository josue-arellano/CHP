import { Component, Inject } from '@angular/core'
import { MatDialogRef, MatDialog,  MAT_DIALOG_DATA } from '@angular/material'
import { Course } from '../helper-classes/course'
import { CourseRemovalConfirmationComponent } from './course-removal-confirmation/course-removal-confirmation.component'
import { CourseClearConfirmationComponent } from './course-clear-confirmation/course-clear-confirmation.component'
import * as _moment from 'moment'

let moment = _moment

@Component({
    selector: 'day-pop-up',
    templateUrl: './day-pop-up.component.html',
    styleUrls: ['./day-pop-up.component.css', '../../component-styles.css']
})
export class DayPopUpComponent {
    date = moment().format('dddd, MMM D, YYYY')

    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<DayPopUpComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any[]
    ) {}

    courses = this.data

    removeCourse(index: number): void {
        const dialogRef = this.dialog.open(CourseRemovalConfirmationComponent)

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                if(this.courses.length === 1) this.courses = []
                else this.courses.splice(index, 1)
            }
        })
    }

    clearCourses(): void {
        const dialogRef = this.dialog.open(CourseClearConfirmationComponent)

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.courses = []
            }
        })
    }

    closeDay() {
        this.dialogRef.close(this.courses)
    }
}