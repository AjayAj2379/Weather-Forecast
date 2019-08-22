import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
cityName : string;

  constructor( private router:Router,
    private route: ActivatedRoute
    
    ) { }

  ngOnInit() {

this.route.params.subscribe((data:any)=>{

  this.cityName= data.id,
  console.log(this.cityName)
})

  }


callDetails()
{
  this.router.navigate(['/forecast/'+this.cityName+'/details'])
}
callGraph()
{
  this.router.navigate(['/forecast/'+this.cityName+'/graph'])
}
}
