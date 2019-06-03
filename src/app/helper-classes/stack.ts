import { Course } from './course'

export class Stack {
    courses: Course[]
    top = -1

    constructor() {
        this.courses = new Array(10)
    }

    pop(): any {
        if(this.top >= 0) {
            let top: Course = this.courses[this.top]
            this.top--
            return top
        }
        else return -1
    }

    push(course: Course) {
        if(this.top >= this.courses.length) {
            this.top++
            this.courses.push(course)
        } else {
            this.top++
            this.courses[this.top] = course
        }
    }

    isEmpty(): boolean {
        return this.top == -1
    }
}