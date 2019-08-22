import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './weather/home-page/home-page.component';
import { DetailsComponent } from './weather/details/details.component';
import { GraphComponent } from './weather/graph/graph.component';
import { ForecastComponent } from './weather/forecast/forecast.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const route : Routes =[
  {path : 'forecast/:id' , component: ForecastComponent,
  children:[
    {path :'', component : DetailsComponent},
    {path:'details',component:DetailsComponent},
    {path:'graph',component:GraphComponent}
    ]
},
  {path:'', component:HomePageComponent},
  {path:'**', component:PagenotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DetailsComponent,
    GraphComponent,
    ForecastComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


