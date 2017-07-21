import { KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from "../../models/vehicle";

@Component({
  templateUrl: './vehicle-list.component.html',
  providers: [ VehicleService ]
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};  
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.populateVehicles();
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);
  }
  private populateVehicles(){
      this.vehicleService.getVehicles(this.filter)
      .subscribe(vehicles => this.vehicles = vehicles);
    
  }
  onFilterChange(){
    this.populateVehicles();
  }

  resetFilter(){
    this.filter = {};
    this.onFilterChange();
  }
}
