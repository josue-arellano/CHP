import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material'

@Component({
    selector: 'course-removal-confirmation',
    templateUrl: './course-removal-confirmation.component.html',
    styleUrls: ['./course-removal-confirmation.component.css']
})
export class CourseRemovalConfirmationComponent {
    constructor(
        public dialogRef: MatDialogRef<CourseRemovalConfirmationComponent>) {}

    yes() {
        this.dialogRef.close(true)
    }

    no() {
        this.dialogRef.close(false)
    }
}