import { Component, OnInit } from '@angular/core';
import {get} from 'scriptjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Weather-Forecast';

  ngOnInit(){

    get("https://code.jquery.com/jquery-1.12.4.js",()=>{

    });
    get("https://code.jquery.com/ui/1.12.1/jquery-ui.js",()=>{});

   
  }
}
