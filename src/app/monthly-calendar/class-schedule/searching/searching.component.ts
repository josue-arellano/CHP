import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component ({
    selector: 'searching',
    templateUrl: './searching.component.html',
    styleUrls: ['./searching.component.css']
})
export class SearchingComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}