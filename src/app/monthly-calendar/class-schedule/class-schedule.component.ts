import { Component, Output, EventEmitter } from '@angular/core'
import { Course } from '../helper-classes/course'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material'
import { ManualCourseComponent } from './manual-course-form/manual-course-form.component'
import { ManualLabFormComponent } from './manual-lab-form/manual-lab-form.component'
import { WebService } from '../../services/web.services'
import { FormGroup, FormControl, Validators } from '@angular/forms'

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

    thisYear = new Date().getFullYear();

    semesters = [
        "Winter",
        "Spring",
        "Summer",
        "Fall"
    ]

    years = [
        this.thisYear - 2,
        this.thisYear - 1,
        this.thisYear,
        this.thisYear + 1
    ]

    deletedCourses: Course[] = []

    courseSearchForm = new FormGroup ({
        courseNum: new FormControl('', [
            Validators.pattern('[1-9][0-9][0-9][0-9][0-9]')
        ]),
        semester: new FormControl(''),
        year: new FormControl('')
    })

    includesLab = false
    finished = true

    constructor(private webService: WebService, public dialog: MatDialog, public snackbar: MatSnackBar) {}

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

    searchForCourse() {
        let courseNumber = this.courseSearchForm.get("courseNum").value
        let semester = this.courseSearchForm.get("semester").value
        let year = this.courseSearchForm.get("year").value
        let newCourse = {}
        this.finished = false
        this.webService.getCourseInfo(semester, year, courseNumber).subscribe(courseInfo => newCourse = courseInfo,
                err => console.log(err),
                () => this.finished = true
            )
        //var newCourse = new Course()
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