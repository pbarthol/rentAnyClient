import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html'
})

export class AccommodationListComponent implements OnInit {
  @Input() listParam;
  @Input() accommodations;
  @Input() arrFilter;
  argFilter: string;

  ngOnInit(){
    if (this.arrFilter) {
      this.argFilter = '';
      for (let i of this.arrFilter) {
        this.argFilter = this.argFilter + i +'#';
      }
    }
  }
  
  ngDoCheck(){
    if (this.arrFilter) {
      this.argFilter = '';
      for (let i of this.arrFilter) {
        this.argFilter = this.argFilter + i +'#';
      }
    }
  }
}


