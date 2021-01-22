import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { environment } from '../../environments/environment';
import { ApiPaths } from '../../enums/api-paths';

@Component({
  selector: 'app-daily-balance',
  templateUrl: './daily-balance.component.html',
  styleUrls: ['./daily-balance.component.css']
})
export class DailyBalanceComponent implements OnInit {

  // Time frame
  daysNum = 3;

  // Server base URL
  serverBaseURL = environment.baseUrl;

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Balance' },
  ];

  barChartLabels: Label[] = [];

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  barChartColors = [
    {
      backgroundColor: []
    },
  ];

  barChartLegend = false;
  barChartPlugins = [];
  barChartType = 'bar';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Initialisation of labels : last 14 days
    this.refreshGraph();
  }

  getDates() {
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    let dateArray: string[] = [];
    var today = new Date();
    var relative_date : Date;
    for (let i = this.daysNum - 1; i > -1 ; i--) {
      relative_date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      dateArray.push(relative_date.toLocaleDateString('fr-FR', options));
    }
    return dateArray;
  }

  getData(){
    let dataArray = [];
    let url = `${this.serverBaseURL}${ApiPaths.DailyBalance}`;
    let params = new HttpParams()
        .set('NbDays', this.daysNum.toString(10));
    let montant;
    this.http.get<JSON>(url, { params: params }).subscribe(
      data => {
        for (let index = 0; index < data['data'].length; index++) {
          montant = data['data'][index].montant
          dataArray.push(montant);
          if(montant > 0) {
            this.barChartColors[0].backgroundColor.push('rgba(80,220,100,0.8)');
          }
          else {
            this.barChartColors[0].backgroundColor.push('rgba(240,128,128,0.8)');
          }
        }
      },
      error => {
        alert(error.message);
      }
    );
    return dataArray;
  }

  updateData(event){
    // Change time frame
    this.daysNum = event.value;
    this.refreshGraph();
  }

  refreshGraph() {
    this.barChartColors[0].backgroundColor = [];
    this.barChartLabels = this.getDates();
    this.barChartData[0].data = this.getData();
  }

}
