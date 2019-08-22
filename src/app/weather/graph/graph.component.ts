import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherServicesService} from '../../service/weather-services.service';
import * as d3 from 'd3';
import {graph} from '../../weather.model'
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  cityName : string;
  array : number[]=[1,9,17,25,33];
  tempArray : number[]=[];
  dateTimeArray: string[]=[];
  index:number;
  graphValues :graph[] =[];
    constructor(private route:ActivatedRoute,private service: WeatherServicesService) { }

  ngOnInit() {

    
    this.route.pathFromRoot[1].params.subscribe((data:any)=>{
    this.cityName= data.id;

    })
    this.service.getForecastDetails(this.cityName).subscribe((data:any)=>{

        for(let i=0; i<this.array.length;i++ )
        {
          this.dateTimeArray.push(data.list[this.array[i]].dt_txt)
          this.tempArray.push(data.list[this.array[i]].main.temp);
        }
        console.log(this.tempArray);
        //console.log(this.dateTimeArray);
        for(let i=0 ;i<this.dateTimeArray.length;i++)
        {
      
       //console.log(this.tempArray[i],this.dateArray)
       this.graphValues.push({"date":this.dateTimeArray[i].split(" ")[0],"temp":this.tempArray[i]})
        }
        console.log(this.graphValues)
        this.chart(this.graphValues)

    })
   
  }
 chart(values:any[])
 {

  const margin = { top: 30, right: 30, bottom: 70, left: 60 },

    width = 460 - margin.left - margin.right,

    height = 400 - margin.top - margin.bottom;

 

    // append the svg object to the body of the page

    const svg = d3.select("#my_dataviz")

    .append("svg")

    .attr("width", width + margin.left + margin.right)

    .attr("height", height + margin.top + margin.bottom)

    .append("g")

    .attr("transform",

          "translate(" + margin.left + "," + margin.top + ")");

 

    // Initialize the X axis

    const x = d3.scaleBand()

    .range([0, width])

    .padding(0.2);

    const xAxis = svg.append("g")

    //.attr("transform", function(d) { return "rotate(65)" });

    .attr("transform", "translate(0," + height + ")")

 

    // Initialize the Y axis

    const y = d3.scaleLinear()

    .range([height, 0]);

    const yAxis = svg.append("g")

    .attr("class", "myYaxis")

 

    update(values);

    // A function that create / update the plot for a given variable:

    function update(data) {

 
console.log(data)
    // Update the X axis

    x.domain(data.map(function (d) { 
      //console.log(d.date)
      return d.date; })) //

    xAxis.call(d3.axisBottom(x))

   

 

    // Update the Y axis

    y.domain([0, d3.max(data, function (d) { return d.temp })]);

    yAxis.transition().duration(1000).call(d3.axisLeft(y));

 

    // Create the u variable

    const u = svg.selectAll("rect")

      .data(data)

 

    u

      .enter()

      .append("rect") // Add a new rect for each new elements

      .merge(u) // get the already existing elements as well

      .transition() // and apply changes to all of them

      .duration(1000)

        .attr("x", function (d) { 
     
          return x(d.date); }) //

        .attr("y", function (d) { return y(d.temp); })

        .attr("width", x.bandwidth())

        .attr("height", function (d) { return height - y(d.temp); })

        .attr("fill", "#FF5533")

 

    // If less group in the new dataset, I delete the ones not in use anymore

    u

      .exit()

      .remove()

    }

 }
}
