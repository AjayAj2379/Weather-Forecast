import { Component, OnInit, Input } from '@angular/core';
import { WeatherServicesService } from '../../service/weather-services.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

cityName: string;
temp: string;
humidity : string;
description : string;
windSpeed : string;
latitude : string;
longitude: string;
icon : string;



  constructor(public service : WeatherServicesService,
    public activatedRoute : ActivatedRoute

   ) { 
  
  }
 
  ngOnInit() {
    console.log(this.activatedRoute.pathFromRoot);
    this.activatedRoute.pathFromRoot[1].params.subscribe(
      data => {
        console.log(data.id);
        this.cityName = data.id;
      }
    )
   // console.log(this.cityName)
   this.service.getWeatherDetails(this.cityName).subscribe( (data: any)=>
    {
      this.temp = data.main.temp;
      this.humidity= data.main.humidity;
      this.description = data.weather[0].description;
      this.windSpeed = data.wind.speed;
      this.latitude = data.coord.lat;
      this.longitude = data.coord.lon;
      this.icon = data.weather[0].icon

      console.log(this.temp);
      console.log(this.humidity);
      console.log(this.description);
      console.log(this.windSpeed);
      console.log(this.latitude);
      console.log(this.longitude);
      console.log(this.icon);

    })
  
  }
  

}
