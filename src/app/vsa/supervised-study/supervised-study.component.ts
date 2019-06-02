import { Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import * as _moment from 'moment'

const moment = _moment

@Component({
    selector: 'supervised-study',
    templateUrl: './supervised-study.component.html',
    styleUrls: ['../../app.component.css', './supervised-study.component.css']
})
export class SupervisedStudyComponent {
    days: string[] = [
        'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
    ]
    hours: string[] = [
        '1', '2','3','4','5','6','7','8','9','10','11','12'
    ]
    minutes: string[] = [
        '00','05','10','15','20','25','30','35','40','45','50','55'
    ]
    periods: string[] = ['AM', 'PM']
    times: string[] = []
    constructor() {
        this.fillTimes()
    }

    @Output() totalHourEmit: EventEmitter<string> = new EventEmitter()

    studyTimeHoursForm = new FormGroup({
        Monday: new FormGroup({
            start1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            start2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Tuesday: new FormGroup({
            start1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            start2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Wednesday: new FormGroup({
            start1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            start2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Thursday: new FormGroup({
            start1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            start2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Friday: new FormGroup({
            start1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            start2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Saturday: new FormGroup({
            start1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            start2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Sunday: new FormGroup({
            start1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end1: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            start2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end2: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        })
    })

    fillTimes() {
        for(var i = 0; i < this.hours.length; i++) {
            let hour = this.hours[i]
            for(var j = 0; j < this.minutes.length; j++) {
                let time = hour + ":" + this.minutes[j];
                this.times.push(time)
            }
        }
    }

    calculateDay(day: string): any {
        let formatString = "h:mm A"
        let empty = "0:00 AM"
        let todayGroup = this.studyTimeHoursForm.get(day)

        let start1Time = todayGroup.get("start1").get("time").value ? todayGroup.get("start1").get("time").value + " " + todayGroup.get("start1").get("period").value : empty
        let end1Time = todayGroup.get("end1").get("time").value ? todayGroup.get("end1").get("time").value + " " + todayGroup.get("end1").get("period").value : empty
        let day1 = moment.duration(moment(end1Time, formatString).diff(moment(start1Time, formatString)))

        let start2Time = todayGroup.get("start2").get("time").value ? todayGroup.get("start2").get("time").value + " " + todayGroup.get("start2").get("period").value : empty
        let end2Time = todayGroup.get("end2").get("time").value ? todayGroup.get("end2").get("time").value + " " + todayGroup.get("end2").get("period").value : empty
        let day2 = moment.duration(moment(end2Time, formatString).diff(moment(start2Time, formatString)))

        let total = day1.add(day2)
        return total
    }

    calculateTotalStudy() {
        let total = moment.duration({
            minutes: 0
        })
        for(var i = 0; i < this.days.length; i++) {
            total.add(this.calculateDay(this.days[i]))
        }
        let hours = Math.floor(total.asHours())
        let minutes = total.minutes() < 10 ? "0" + total.minutes() : total.minutes()
        this.totalHourEmit.emit(hours + ":" + minutes)
    }
}
