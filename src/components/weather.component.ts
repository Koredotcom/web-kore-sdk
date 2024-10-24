import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true
})
export class Weather {
    @Input() msgData: any;

    handleClick() {
        alert('button clicked');
    }
}
