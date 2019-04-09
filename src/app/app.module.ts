import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { WebService } from '../app/services/web.services'
import { 
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatTableModule,
  MatIconModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatTabsModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatBottomSheetModule
} from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AmazingTimePickerModule } from 'amazing-time-picker'
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { HomeComponent } from './home/home.component'
import { MonthlyCalendarComponent } from './monthly-calendar/monthly-calendar.component'
import { DayPopUpComponent } from './monthly-calendar/day-pop-up/day-pop-up.component'
import { ClassScheduleComponent } from './monthly-calendar/class-schedule/class-schedule.component'
import { ManualCourseComponent } from './monthly-calendar/class-schedule/manual-course-form/manual-course-form.component'
import { ManualLabFormComponent } from './monthly-calendar/class-schedule/manual-lab-form/manual-lab-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MomentModule } from 'ngx-moment'
import { SearchingComponent } from './monthly-calendar/class-schedule/searching/searching.component'
import { CourseRemovalConfirmationComponent } from './monthly-calendar/day-pop-up/course-removal-confirmation/course-removal-confirmation.component'
import { CourseClearConfirmationComponent } from './monthly-calendar/day-pop-up/course-clear-confirmation/course-clear-confirmation.component'
var routes = [{
  path: '',
  component: MonthlyCalendarComponent
}]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    MonthlyCalendarComponent,
    DayPopUpComponent,
    ClassScheduleComponent,
    ManualCourseComponent,
    ManualLabFormComponent,
    CourseRemovalConfirmationComponent,
    CourseClearConfirmationComponent,
    SearchingComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MomentModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSelectModule,
    AmazingTimePickerModule,
    HttpModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule
  ],
  providers: [ WebService ],
  bootstrap: [AppComponent],
  entryComponents: [
    ManualCourseComponent,
    ManualLabFormComponent,
    DayPopUpComponent,
    CourseRemovalConfirmationComponent,
    CourseClearConfirmationComponent,
    SearchingComponent
  ]
})
export class AppModule { }
