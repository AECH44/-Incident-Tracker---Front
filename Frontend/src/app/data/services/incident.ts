import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Incident } from '../../domain/models/incident.model';
import { MOCK_INCIDENTS } from '../mocks/incident.mock';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor() {}

  getIncidents(): Observable<Incident[]> {
    return of(MOCK_INCIDENTS);
  }

}