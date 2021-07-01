import { Component, OnInit } from '@angular/core';
import { GlobalDataSummery } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  data: GlobalDataSummery[] = [];
  countries: any[] = [];

  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(result => {
      this.data = result;

      this.data.forEach(cs => {
        this.countries.push(cs.country)
      })
    })
  }

  selectCountry(country: string) {
    this.data.forEach(cs => {
      if (cs.country == country) {
        this.totalConfirmed = Number(cs.confirmed)
        this.totalDeaths = Number(cs.deaths)
        this.totalRecovered = Number(cs.recovered)
        this.totalActive = Number(cs.active)
      }
    })
  }

}
