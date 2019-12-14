import { Injectable } from '@angular/core';

import { Locations } from '../interfaces/locations';
import { LOCATIONS } from '../mocks/locations.mock';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  constructor() { }

  getLocations(): Array<Locations> {
    return LOCATIONS;
  }
}
