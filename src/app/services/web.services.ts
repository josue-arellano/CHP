import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { Subject, Observable } from 'rxjs'

@Injectable()
export class WebService {
    BASE_URL = '/api'

    private courseInfo = {
        courseName: "",
        courseDesc: "",
        courseNum: "",
        daysOfWeek: "",
        meetingTime: "",
        meetingDates: ""
    }

    private courseSubject = new Subject()

    course = this.courseSubject.asObservable();

    constructor(private http: Http, private sb: MatSnackBar) {}

    getCourseInfo(semester, year, courseNumber) {
        return this.http.get(this.BASE_URL + '?semester=' + semester + '&year=' + year + '&course=' + courseNumber)
    }

    private handleError(error) {
        console.error(error)
        this.sb.open(error, 'close', {duration: 5000})
    }
}