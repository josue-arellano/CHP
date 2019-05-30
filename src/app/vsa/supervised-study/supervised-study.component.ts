import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Course } from '../../monthly-calendar/helper-classes/course'

@Component({
    selector: 'supervised-study',
    templateUrl: './supervised-study.component.html',
    styleUrls: ['../../app.component.css']
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

    studyTimeHoursForm = new FormGroup({
        Monday1: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Monday2: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Tuesday1: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Tuesday2: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Wednesday1: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Wednesday2: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Thursday1: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Thursday2: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Friday1: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Friday2: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Saturday1: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Saturday2: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Sunday1: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            })
        }),
        Sunday2: new FormGroup({
            start: new FormGroup({
                time: new FormControl(''),
                period: new FormControl('')
            }),
            end: new FormGroup({
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
}
