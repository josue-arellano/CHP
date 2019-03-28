import { Component, Output, EventEmitter } from '@angular/core'
import { Course } from '../helper-classes/course'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material'
import { ManualCourseComponent } from './manual-course-form/manual-course-form.component'
import { ManualLabFormComponent } from './manual-lab-form/manual-lab-form.component'

const onlineWarningError = "You are trying to add an online course! Please add this course with the manual course form by clicking the 'Add Course Manually' button."

@Component({
    selector: 'class-schedule',
    templateUrl: './class-schedule.component.html',
    styleUrls: ['./class-schedule.component.css']
})
export class ClassScheduleComponent {
    columnsToDisplay = ['courseNum', 'courseName', 'daysOfWeek', 'startTime', 'endTime', 'weeklyHrs', 'remove']

    @Output() courseEvent = new EventEmitter<Course[]>()
    
    classSchedule: Course[] = [
        new Course("ADM JUS 006", "Patrol Procedures", '13478', false, "We", "02/04/2019-06/03/2019", "06:50PM-10:00PM"),
        new Course("ADM JUS 006", "Patrol Procedures", '24910', false, "Tu", "02/4/2019-06/-3/2019", "05:30PM-08:40PM")
    ]

    deletedCourses: Course[] = []

    includesLab = false

    constructor(public dialog: MatDialog, public snackbar: MatSnackBar) {}

    ngOnInit() {
        this.courseEvent.emit(this.classSchedule)
    }

    openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action, {
            duration: 15000,
        })
    }

    remove(courseNum: string) {
        if(courseNum === "00000") this.includesLab = false
        if(this.classSchedule.length === 1) this.classSchedule = []
        else {
            this.classSchedule = this.classSchedule.filter(function(value, index, arr) {
                return value.courseNum !== courseNum
            })
        }
        this.courseEvent.emit(this.classSchedule)
    }

    openManualCourseForm(): void {
        const dialogRef = this.dialog.open(ManualCourseComponent, {
            width: '450px'
        })

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.classSchedule = this.classSchedule.concat(result)
                this.courseEvent.emit(this.classSchedule)
            }
        })
    }

    openManualLabForm(): void {
        const dialogRef = this.dialog.open(ManualLabFormComponent, {
            width: '370px;'
        })

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.classSchedule = this.classSchedule.concat(result)
                this.includesLab = true
                this.courseEvent.emit(this.classSchedule)
            }
        })
    }
}