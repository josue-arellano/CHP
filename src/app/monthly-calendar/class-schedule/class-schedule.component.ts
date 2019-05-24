import { Component, Output, EventEmitter } from '@angular/core'
import { Course } from '../helper-classes/course'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material'
import { ManualCourseComponent } from './manual-course-form/manual-course-form.component'
import { ManualLabFormComponent } from './manual-lab-form/manual-lab-form.component'
import { WebService } from '../../services/web.services'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { SearchingComponent } from './searching/searching.component';
import { Stack } from '../helper-classes/stack'

const onlineWarningError = "You are trying to add an online course! Please add this course with the manual course form by clicking the 'Add Course Manually' button."

@Component({
    selector: 'class-schedule',
    templateUrl: './class-schedule.component.html',
    styleUrls: ['./class-schedule.component.css']
})
export class ClassScheduleComponent {
    columnsToDisplay = ['courseNum', 'courseName', 'daysOfWeek', 'startTime', 'endTime', 'weeklyHrs', 'remove']

    @Output() courseEvent = new EventEmitter<Course[]>()
    
    classSchedule: Course[] = []

    deletedCourses: Stack = new Stack

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

    courseSearchForm = new FormGroup ({
        courseNum: new FormControl('', [
            Validators.pattern('[1-9][0-9][0-9][0-9][0-9]')
        ]),
        semester: new FormControl(''),
        year: new FormControl('')
    })

    includesLab = false
    searching = false
    deletedIsEmpty = this.deletedCourses.isEmpty()

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
        for(let course of this.classSchedule) {
            if(course.courseNum === courseNum) {
                this.deletedCourses.push(course)
                console.log(this.deletedCourses.courses)
            }
        }
        if(this.classSchedule.length === 1) this.classSchedule = []
        else {
            this.classSchedule = this.classSchedule.filter(function(value, index, arr) {
                return value.courseNum !== courseNum
            })
        }
        this.deletedIsEmpty = this.deletedCourses.isEmpty()
        this.courseEvent.emit(this.classSchedule)
    }

    undoDelete() {
        this.classSchedule = this.classSchedule.concat(this.deletedCourses.pop())
        this.deletedIsEmpty = this.deletedCourses.isEmpty()
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
        let newCourseInfo
        this.searching = true
        const dialogRef = this.dialog.open(SearchingComponent, {
            data: {
                courseNum: courseNumber,
                semester: semester,
                year: year
            }
        })
        this.webService.getCourseInfo(semester, year, courseNumber).subscribe(courseInfo => newCourseInfo = courseInfo.json(),
                err => {
                    dialogRef.close();
                    console.log(err)
                    this.openSnackBar("Course listing for semester selected does not exist. Try again with another semester!", "Close")
                },
                () => {
                    dialogRef.close("Found Course!");
                    this.searching = false
                    this.courseSearchForm.get("courseNum").setValue('');
                    if(newCourseInfo.courseName == "") {
                        this.openSnackBar("Course not found!", "Close");
                    } else if(newCourseInfo.daysOfWeek == "TBA") {
                        let errorMessage = "This course is either a lab or an online course. Please add this course manually by clicking the 'Add Course Manually' button."
                        this.openSnackBar(errorMessage, "Close")
                    } else {
                        let courseInfoString = "Added course: " + newCourseInfo.courseNum + " " + newCourseInfo.courseName + ", " + newCourseInfo.courseDesc + "."
                        this.openSnackBar(courseInfoString, "Close")
                        let newCourse = new Course(
                            newCourseInfo.courseName, 
                            newCourseInfo.courseDesc, 
                            newCourseInfo.courseNum, 
                            false,
                            newCourseInfo.daysOfWeek,
                            newCourseInfo.meetingDates,
                            newCourseInfo.meetingTime,
                            false,
                            false
                        )
                        this.classSchedule = this.classSchedule.concat(newCourse)
                        this.courseEvent.emit(this.classSchedule)
                    }
                }
            )
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