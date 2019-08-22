import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherServicesService {

  url:string;



  constructor(private http:HttpClient) { }

  getWeatherDetails(place)
  {
    this.url= "https://api.openweathermap.org/data/2.5/weather?q="+place+"&units=metric&APPID=98053c23d92430b429706649acfb4ada"
    return this.http.get(this.url)
  }
  getForecastDetails(place)
  {
    this.url="https://api.openweathermap.org/data/2.5/forecast?q=" + place + "&units=metric&APPID=98053c23d92430b429706649acfb4ada"
    return this.http.get(this.url)
  }
}
