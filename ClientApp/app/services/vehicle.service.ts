import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  constructor(private http: Http) { }
  private readonly vehiclesEndpoint = 'http://localhost:5000/api/vehicles';

  getMakes(){
    return this.http.get('http://localhost:5000/api/makes')
      .map(res=> res.json());
  }

   getFeatures(){
    return this.http.get('http://localhost:5000/api/features')
    .map(res=>res.json());
  }

  create(vehicle){
    return this.http.post(this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  getVehicle(id){
    return this.http.get(this.vehiclesEndpoint + '/' +id)
      .map(res => res.json());
  }

  update(vehicle){
    // console.log(vehicle);
    return this.http.put(this.vehiclesEndpoint + '/' +vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(id){
    return this.http.delete(this.vehiclesEndpoint + '/' +id);
  }

  getVehicles(filter){
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
      .map(res => res.json());
  }

  toQueryString(obj){
    var parts = [];
    for (var property in obj){
      var value = obj[property];
      if (value != null && value != undefined){
        parts.push(encodeURIComponent(property)+'='+encodeURIComponent(value));
      }
      return parts.join('&');
    }
  }
}
