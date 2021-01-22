import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ApiPaths } from '../../enums/api-paths';

@Component({
  selector: 'app-my-money',
  templateUrl: './my-money.component.html',
  styleUrls: ['./my-money.component.css']
})
export class MyMoneyComponent implements OnInit {

  // Server base URL
  serverBaseURL = environment.baseUrl;

  money = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMoney();
  }

  getMoney() {
    let url = `${this.serverBaseURL}${ApiPaths.MoneyTotal}`;
    this.http.get<JSON>(url).subscribe(
      data => {
        console.log(data['data']);
        this.money = Math.round(data['data'] * 100) / 100;
      },
      error => {
        alert(error.message);
      }
    );
  }

}
