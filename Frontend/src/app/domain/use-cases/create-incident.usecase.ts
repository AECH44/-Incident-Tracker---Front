import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Incident } from '../../core/models/incident.model';
import { IncidentRepository } from '../repositories/incident.repository';

@Injectable({
  providedIn: 'root'
})
export class CreateIncidentUseCase {

  private repository = inject(IncidentRepository);

  execute(
    incident: Incident
  ): Observable<void> {

    return this.repository.createIncident(
      incident
    );

  }

}