import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Incident } from '../../core/models/incident.model';
import { IncidentRepository } from '../repositories/incident.repository';

@Injectable({
  providedIn: 'root'
})
export class GetIncidentsUseCase {

  private repository = inject(IncidentRepository);

  execute(): Observable<Incident[]> {
    return this.repository.getIncidents();
  }

}

