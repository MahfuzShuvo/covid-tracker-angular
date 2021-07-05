import { Component, OnInit } from '@angular/core';
import { GlobalData } from 'src/app/models/global-data';
import { ApiService } from 'src/app/services/api.service';
import { ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  global: boolean = false;
  country!: string;
  data: GlobalData;
  dailyData: any[] = [];
  countries: any[] = [];
  lineChartData: any[] = [
    {
      data: [65, 64, 33, 44],
      label: 'Temp label'
    }
  ];
  public lineChartType: ChartType = "line";
  lineChartColors: Color[] = [
    { backgroundColor: '#fbff0052' },
    { backgroundColor: '#ff001952' },
  ];
  lineChartLabels: any[] = [
    'label01', 'label02', 'label03'
  ];
  barChartData: any[] = [
    {
      data: [65, 76, 33],
      label: 'Label'
    }
  ];
  public barChartType: ChartType = 'bar';
  public barChartColors: Color[] = [
    { backgroundColor: ['#fbff0052', '#03ff3d52', '#ff001952'] }
  ];
  barChartLabels: any[] = [
    'Confirmed', 'Recovered', 'Deaths'
  ];

  constructor(private api: ApiService) {
    this.data = new GlobalData();
  }

  ngOnInit(): void {
   this.global = true;
   this.fetchData();
   this.fetchCountries();
   this.fetchDailyData();
  }

  fetchData() {
    this.api.fetchData().subscribe((res: any = []) => {
      this.data.confirmed = res['confirmed']['value'];
      this.data.recovered = res['recovered']['value'];
      this.data.deaths = res['deaths']['value'];
      this.data.lastUpdate = res['lastUpdate'];
    });
  }

  fetchCountries() {
    this.api.fetchCountries().subscribe((res: any = []) => {
      var countries = res['countries'];
      this.countries = countries.map((name: any) => name['name']);
    });
  }

  fetchDataByCountry(country: string) {
    this.api.fetchDataByCountry(country).subscribe((res: any = []) => {
      this.data.confirmed = res['confirmed']['value'];
      this.data.recovered = res['recovered']['value'];
      this.data.deaths = res['deaths']['value'];
      this.data.lastUpdate = res['lastUpdate'];

      this.barChartData = [
        {
          data: [
            this.data.confirmed, 
            this.data.recovered,
            this.data.deaths
          ],
          label: 'People'
        }
      ]
    });
  }

  fetchDailyData() {
    this.api.fetchDailyData().subscribe((res: any = []) => {
      this.lineChartLabels = res.map((date: any) => date['reportDate']);

      var confirmedData = res.map((confirmed: any) => confirmed['totalConfirmed']);
      var deathsData = res.map((deaths: any) => deaths['deaths']['total']);
      var recoveredData = res.map((rev: any) => rev);

      this.lineChartData = [
        {
          data: confirmedData,
          label: 'Confirmed'
        },
        {
          data: deathsData,
          label: 'Deaths'
        }
      ]
    });
  }

  selectCountry(value: string) {
    this.country = value;
    if (value == 'global') {
      this.fetchData();
      this.global = true;
    } else {
      this.fetchDataByCountry(value);
      this.global = false;
    }
  }

}
