import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router"
import {WeatherServicesService} from '../../service/weather-services.service'



declare var $:any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
searchfield=false;
cityName:string;
apifail = false;

 
  constructor(private http:HttpClient, 
    private service: WeatherServicesService,
   private router: Router
  
    ) {
    
     }

  ngOnInit() {
    console.log(this.apifail)
    $(document).ready(function(){
      var cityarray=[]; 
   $.getJSON('/assets/city.list.json',function(data){
        
         $.each(data,function(i,city){
  
          cityarray.push(city.name)
         });
        
   });
   $("#inputfield").autocomplete({
      source: function (request, response) {
          var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
          response($.grep(cityarray, function (item) {
              return matcher.test(item);
          }));
      }
  },{minLength:3});
  });
   
   
  }
  callApi(place)
  {
    if(place =='')
    {
      this.searchfield=true;
      
    }
    else{
      this.searchfield=false;
      this.service.getWeatherDetails(place).subscribe(
        (data:any) => {
          console.log(data);
          this.apifail=false;
        this.cityName = data.name;
       console.log(this.cityName)   ;
      this.router.navigate(['/forecast/'+this.cityName])
        
        }, (error:any)=> {
          this.apifail= true ;
          //console.log("error")
        }
      
        )
       
    }

 
 

  
  }
}
