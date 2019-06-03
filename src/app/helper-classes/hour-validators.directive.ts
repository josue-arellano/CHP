import { ValidatorFn, AbstractControl } from '@angular/forms'

const hourRegex = /([1-2]?[0-9]:[0-5][0-9]|[1-2]?[0-9])/

export function hourValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const validates = hourRegex.test(control.value)
        return validates ? {'forbidden': {value: control.value}} : null
    }
}