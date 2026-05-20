import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { CommonModule, Location } from '@angular/common';

import { Incident } from 'src/app/core/models/incident.model';

import { Severity } from 'src/app/core/enums/severity.enum';
import { Status } from 'src/app/core/enums/status.enum';

import { StorageService } from 'src/app/data/services/storage.service';

import { GetIncidentsUseCase } from 'src/app/domain/use-cases/get-incidents.usecase';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.page.html',
  styleUrls: ['./incident-detail.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonBadge
  ]
})
export class IncidentDetailPage
  implements OnInit {

  incident!: Incident;

  readonly Severity = Severity;
  readonly Status = Status;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private getIncidentsUseCase: GetIncidentsUseCase,
    private location: Location
  ) {}

  ngOnInit() {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadIncident(id);
    }
  }

  loadIncident(id: string) {

    const localIncident =
      this.storageService
        .getIncidentById(id);

    if (localIncident) {

      this.incident = {
        ...localIncident
      };

      return;
    }

    this.getIncidentsUseCase
      .execute()
      .subscribe(data => {

        const found =
          data.find(i => i.id === id);

        if (found) {

          this.incident = {
            ...found
          };
        }
      });
  }

  goBack() {

    this.location.back();
  }

  saveLocalIncident() {

    this.storageService
      .updateIncident(this.incident);
  }

  acknowledge() {

    if (
      this.incident.status ===
      Status.OPEN
    ) {

      this.incident.status =
        Status.ACKNOWLEDGED;

      this.incident.severity =
        Severity.P2;

      this.incident.updatedAt =
        new Date().toISOString();

      this.saveLocalIncident();
    }
  }

  resolve() {

    if (
      this.incident.status ===
      Status.ACKNOWLEDGED
    ) {

      this.incident.status =
        Status.RESOLVED;

      this.incident.severity =
        Severity.P3;

      this.incident.updatedAt =
        new Date().toISOString();

      this.saveLocalIncident();
    }
  }

  canAcknowledge(): boolean {

    return (
      this.incident.status ===
      Status.OPEN
    );
  }

  canResolve(): boolean {

    return (
      this.incident.status ===
      Status.ACKNOWLEDGED
    );
  }

  getSeverityClass() {

    switch (this.incident.severity) {

      case Severity.P1:
        return 'badge-p1';

      case Severity.P2:
        return 'badge-p2';

      case Severity.P3:
        return 'badge-p3';

      default:
        return '';
    }
  }

  getStatusClass() {

    switch (this.incident.status) {

      case Status.OPEN:
        return 'badge-open';

      case Status.ACKNOWLEDGED:
        return 'badge-ack';

      case Status.RESOLVED:
        return 'badge-resolved';

      default:
        return '';
    }
  }

  getSeverityLabel(): string {

    switch (this.incident.severity) {

      case Severity.P1:
        return 'P1 - Crítica';

      case Severity.P2:
        return 'P2 - Alta';

      case Severity.P3:
        return 'P3 - Media';

      default:
        return this.incident.severity;
    }
  }
}