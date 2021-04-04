import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Color, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  @Input() public title: string = 'Sin titulo';
  @Input('labels') public doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3' ];
  @Input('data') public doughnutChartData: SingleDataSet[] = [ [10, 20, 30], ];

  public colors: Color[] = [

    { backgroundColor: [ '#68576E', '#009FEE', '#F02059' ] }

  ];

  constructor() { }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
