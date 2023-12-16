import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(temperatura: number, unit: string){
    if (temperatura && !isNaN(temperatura)){
      if( unit === 'C'){
        let tempC = (temperatura - 32)*0.555;
        return `${tempC.toFixed(1)}°C`;
      } else if ( unit === 'F'){
        let tempF = temperatura * 1.8 + 32
        return `${tempF.toFixed(1)}°F`;
      }
    }
    return 'Error: No es valido';
  }
}

// C => F : temperatura * 1.8 + 32
// F => C : (temperatura -32) * 0.555
