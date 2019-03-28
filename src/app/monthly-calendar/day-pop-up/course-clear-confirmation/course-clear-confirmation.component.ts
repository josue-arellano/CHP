import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material'

@Component({
    selector: 'course-clear-confirmation',
    templateUrl: './course-clear-confirmation.component.html',
    styleUrls: ['./course-clear-confirmation.component.css']
})
export class CourseClearConfirmationComponent {
    constructor(
        public dialogRef: MatDialogRef<CourseClearConfirmationComponent>) {}

    yes() {
        this.dialogRef.close(true)
    }

    no() {
        this.dialogRef.close(false)
    }
}