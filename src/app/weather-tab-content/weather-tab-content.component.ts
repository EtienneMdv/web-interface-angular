import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-tab-content',
  templateUrl: './weather-tab-content.component.html',
  styleUrls: ['./weather-tab-content.component.css']
})
export class WeatherTabContentComponent implements OnInit {

  apiWeather = '4a929b47b51b837bcc2a4dcf8f454c8a';
  lat:number;
  lon:number;
  temperature:number;
  city:string;
  loaded = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Get location
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log("Got position", position.coords);
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      // Get weather
      this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiWeather}&units=metric`).subscribe(data => {
          this.loaded = true;
          this.temperature = data['main'].temp;
          this.city = data['name'];
      });
    });
  }

}
