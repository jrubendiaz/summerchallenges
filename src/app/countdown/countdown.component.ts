import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { setTimeout } from 'timers';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  private data: Observable<any>;

  public days : Number;
  public hours : Number;
  public minutes : Number;
  public seconds : Number;

  constructor() {
    setInterval(this.getCountDown, 1000);
  }

  ngOnInit() {

  }

  getCountDown() {
    let _days = document.getElementById("days");
    let _hours = document.getElementById("hours");
    let _minutes = document.getElementById("minutes");
    let _seconds = document.getElementById("seconds");

    // Set the unit values in milliseconds.
    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;
    var msecPerDay = msecPerHour * 24;

    // Set a date and get the milliseconds
    var date = new Date('2/2/2018');
    var dateMsec = date.getTime();

    // Set the date to January 1, at midnight, of the specified year.
    date.setMonth(1);
    date.setDate(2);
    date.setHours(0, 0, 0, 0);

    let now = Date.now();

    // Get the difference in milliseconds.
    var interval = date.getTime() - Date.now();

    // Calculate how many days the interval contains. Subtract that
    // many days from the interval to determine the remainder.
    var days = Math.floor(interval / msecPerDay );
    interval = interval - (days * msecPerDay );

    // Calculate the hours, minutes, and seconds.
    var hours = Math.floor(interval / msecPerHour );
    interval = interval - (hours * msecPerHour );

    var minutes = Math.floor(interval / msecPerMinute );
    interval = interval - (minutes * msecPerMinute );

    var seconds = Math.floor(interval / 1000 );

    _days.innerText = "" + days;
    _hours.innerText = "" + hours;
    _minutes.innerText = "" + minutes;
    _seconds.innerText = "" + seconds;


    console.log(this.seconds);
  }
}
