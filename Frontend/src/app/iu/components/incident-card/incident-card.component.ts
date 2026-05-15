import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Incident } from 'src/app/core/models/incident.model';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonBadge,
  IonCardContent,
  IonIcon
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-incident-card',
  templateUrl: './incident-card.component.html',
  styleUrls: ['./incident-card.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCardContent,
    IonBadge,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    CommonModule
  ]
})
export class IncidentCardComponent
  implements OnInit, OnDestroy {

  @Input() incident!: Incident;

  timeAgo = '';

  private intervalId: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    this.updateTimeAgo();

    this.intervalId = setInterval(() => {
      this.updateTimeAgo();
    }, 1000);

  }

  ngOnDestroy(): void {

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

  }

  updateTimeAgo(): void {
    this.timeAgo = this.calculateTimeAgo();
  }

  getSeverityColor() {

    switch (this.incident.severity) {

      case 'P1':
        return 'danger';

      case 'P2':
        return 'warning';

      case 'P3':
        return 'medium';

      default:
        return 'light';

    }

  }

  private calculateTimeAgo(): string {

    const now = new Date().getTime();

    const created = new Date(
      this.incident.createdAt
    ).getTime();

    const diff = Math.floor(
      (now - created) / 1000
    );

    if (diff < 60) {
      return `Hace ${diff}s`;
    }

    if (diff < 3600) {
      return `Hace ${Math.floor(diff / 60)}m`;
    }

    return `Hace ${Math.floor(diff / 3600)}h`;

  }

  openDetail() {

    if (!this.incident?.id) {

      console.error(
        'Incidente sin ID',
        this.incident
      );

      return;

    }

    this.router.navigate([
      '/incident-detail',
      this.incident.id
    ]);

  }

}