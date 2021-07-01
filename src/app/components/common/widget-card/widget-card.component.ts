import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-card',
  templateUrl: './widget-card.component.html',
  styleUrls: ['./widget-card.component.scss']
})
export class WidgetCardComponent implements OnInit {

  @Input('totalConfirmed') totalConfirmed: any;
  @Input('totalActive') totalActive: any;
  @Input('totalRecovered') totalRecovered: any;
  @Input('totalDeaths') totalDeaths: any;

  constructor() { }

  ngOnInit(): void {
  }

}
