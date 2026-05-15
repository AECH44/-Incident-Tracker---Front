import { Observable } from 'rxjs';
import { Incident } from '../../core/models/incident.model';

export abstract class IncidentRepository {

  abstract getIncidents(): Observable<Incident[]>;

  abstract createIncident(
    incident: Incident
  ): Observable<void>;

  abstract listenIncidents(): Observable<Incident>;

}

