import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   varAplicacion: any = [];

   highcharts = Highcharts;

   chartOptions1: Highcharts.Options = {
      title: {
         text: "Average Temprature"
      },
      xAxis: {
         title: {
            text: 'Tokyo'
         },
         categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yAxis: {
         title: {
            text: "Temprature"
         }
      },
      series: [{
         data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 24.4, 19.3, 16.0, 18.4, 17.9],
         type: 'spline'
      }]
   };

   chartOptions2: Highcharts.Options = {   
      chart : {
         plotShadow: false
      },
      title : {
         text: 'Browser market shares at a specific website, 2014'   
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            shadow: false,
            center: ['50%', '50%'],
            size:'45%',
            innerSize: '20%'            
         }
      },
      series : [{
         type: 'pie',
         name: 'Browser share',
         data: [
            ['Firefox',   45.0],
            ['IE',       26.8],
            {
               name: 'Chrome',
               y: 12.8,
               sliced: true,
               selected: true
            },
            ['Safari',    8.5],
            ['Opera',     6.2],
            ['Others',      0.7]
         ]
      }]
   };

   chartOptions3: any = {   
      chart: {
         type: 'column'
      },
      title: {
         text: 'Monthly Average Rainfall'
      },
      subtitle:{
         text: 'Source: WorldClimate.com' 
      },
      xAxis:{
         categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul',
                      'Aug','Sep','Oct','Nov','Dec'],
         crosshair: true        
      },     
      yAxis : {
         min: 0,
         title: {
            text: 'Rainfall (mm)'         
         }      
      },
      tooltip : {
         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
            '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
      },
      plotOptions : {
         column: {
            pointPadding: 0.2,
            borderWidth: 0
         }
      },
      series: [{
         name: 'Tokyo',
         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6,
                148.5, 216.4, 194.1, 95.6, 54.4]
      }, 
      {
         name: 'New York',
         data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3,
                91.2, 83.5, 106.6, 92.3]
      }, 
      {
         name: 'London',
         data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6,
                52.4, 65.2, 59.3, 51.2]
      }, 
      {
         name: 'Berlin',
         data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4,
                47.6, 39.1, 46.8, 51.1]
      }]
   };

  constructor(private api: ApiService) {}

  ngOnInit(): void {}
}
