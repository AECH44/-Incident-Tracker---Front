import {
  Injectable,
  NgZone
} from '@angular/core';

import { Observable } from 'rxjs';

import { Incident } from '../../core/models/incident.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentSseService {

  constructor(
    private zone: NgZone
  ) {}

  connect(): Observable<Incident> {

    return new Observable(observer => {

      /*
      Código comentado temporalmente hasta
      habilitar el endpoint SSE real.
      */

      /*
      const eventSource = new EventSource(
        environment.sseUrl
      );

      eventSource.onmessage = (event) => {

        this.zone.run(() => {

          const incident: Incident =
            JSON.parse(event.data);

          observer.next(incident);
        });
      };

      eventSource.onerror = (error) => {

        this.zone.run(() => {
          observer.error(error);
        });

        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
      */

      console.log(
        'SSE deshabilitado temporalmente (modo mock)'
      );
    });
  }
}