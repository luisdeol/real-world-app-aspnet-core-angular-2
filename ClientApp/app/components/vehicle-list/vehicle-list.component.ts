import { KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from "../../models/vehicle";

@Component({
  templateUrl: './vehicle-list.component.html',
  providers: [ VehicleService ]
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3; 
  makes: KeyValuePair[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };  
  queryResult: any = {
  };
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    {}
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.populateVehicles();
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);
  }
  
  private populateVehicles(){
      this.vehicleService.getVehicles(this.query)
      .subscribe(result => this.queryResult = result);   
  }

  onFilterChange(){
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter(){
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending; 
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page) {
    this.query.page = page; 
    this.populateVehicles();
  }
}
