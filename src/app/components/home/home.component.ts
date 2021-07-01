import { Component, OnInit } from '@angular/core';
import { GlobalDataSummery } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;

  globalData: GlobalDataSummery[] = [];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        console.log(result);

        this.globalData = result;

        result.forEach(cs => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalConfirmed += Number(cs.confirmed)
            this.totalDeaths += Number(cs.deaths)
            this.totalRecovered += Number(cs.recovered)
            this.totalActive += Number(cs.active)
          }
        })
      }
    });
  }

}
