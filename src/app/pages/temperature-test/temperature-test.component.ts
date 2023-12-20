import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Temperature } from 'src/app/models/temperature';

@Component({
  selector: 'app-temperature-test',
  templateUrl: './temperature-test.component.html',
  styleUrls: ['./temperature-test.component.css']
})
export class TemperatureTestComponent {
  public tempC : number = 0;
  public tempF : number = 32;
}