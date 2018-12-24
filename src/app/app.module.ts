import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { 
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { HomeComponent } from './home/home.component'
import { MonthlyCalendarComponent } from './monthly-calendar/monthly-calendar.component'

var routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'monthly',
  component: MonthlyCalendarComponent
}]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    MonthlyCalendarComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
