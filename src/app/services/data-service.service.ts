import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalDataSummery } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataURL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-30-2021.csv`;

  constructor(private http: HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globalDataURL, { responseType: 'text' }).pipe(
      map(result => {
        // let data: GlobalDataSummery[] = [];
        let data: { [key: string]: any } = {};
        let rows = result.split('\n');
        rows.splice(0, 1);

        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          // console.log(cols);

          let cs = {
            country: cols[3],
            last_update: cols[4],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10]
          };
          let temp: GlobalDataSummery = data[cs.country];
          if (temp) {
            temp.last_update = cs.last_update + temp.last_update
            temp.confirmed = cs.confirmed + Number(temp.confirmed)
            temp.deaths = cs.deaths + Number(temp.deaths)
            temp.recovered = cs.recovered + Number(temp.recovered)
            temp.active = cs.active + Number(temp.active)

            data[cs.country] = temp;
          } else {
            data[cs.country] = cs;
          }

        })
        // console.log(data);

        return <GlobalDataSummery[]>Object.values(data);
      })
    );
  }
}
