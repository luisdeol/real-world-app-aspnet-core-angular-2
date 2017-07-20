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
  allVehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};  
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);
    
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);
  }
  onFilterChange(){
    var vehicles = this.allVehicles;
    if (this.filter.makeid)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeid);

    this.vehicles = vehicles;
    console.log(this.vehicles);
  }

  resetFilter(){
    this.filter = {};
    this.onFilterChange();
  }
}
