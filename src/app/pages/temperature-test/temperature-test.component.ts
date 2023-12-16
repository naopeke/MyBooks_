import { Component } from '@angular/core';
import { Temperature } from 'src/app/models/temperature';

@Component({
  selector: 'app-temperature-test',
  templateUrl: './temperature-test.component.html',
  styleUrls: ['./temperature-test.component.css']
})
export class TemperatureTestComponent {
  public tempC = 10;
  public tempF = 10;
}
