import { Component, OnInit, inject } from '@angular/core';
import { IncidentService } from 'src/app/data/services/incident';
import { CommonModule } from '@angular/common';
import { Incident } from 'src/app/domain/models/incident.model';
import { IncidentCardComponent } from '../../components/incident-card/incident-card.component';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonList,
  IonButtons,
  IonIcon,
  IonButton,
  IonBadge,
  IonMenuButton,
  IonItem,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';

import { PopoverController } from '@ionic/angular';
import { NotificationsComponent } from 'src/app/iu/components/notifications/notifications.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonItem,
    IonBadge,
    IonButton,
    IonIcon,
    IonButtons,
    IonList,
    IonSpinner,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IncidentCardComponent,
    CommonModule,
    IonMenuButton
  ]
})
export class HomePage implements OnInit {

  incidents: Incident[] = [];
  loading = true;
  error = false;

  hasCriticalAlert = false;
  criticalCount = 0;
  bannerVisible = true;

  private popoverCtrl = inject(PopoverController);
  private router = inject(Router);

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.loadIncidents();
  }

  ionViewWillEnter() {
    this.loadIncidents();
  }

  loadIncidents() {
    this.loading = true;

    this.incidentService.getIncidents().subscribe({
      next: (data) => {

        const localIncidents = JSON.parse(localStorage.getItem('incidents') || '[]');

        const mappedLocal: Incident[] = localIncidents.map((i: any) => ({
          id: i.id,
          title: i.title,
          description: i.description,
          severity: i.severity || 'P3',
          status: i.status || 'OPEN',
          createdAt: i.createdAt || new Date().toISOString(),
          updatedAt: i.updatedAt || new Date().toISOString(),
          assignedTo: i.assignedTo || null
        }));

        const mappedApi: Incident[] = (data || []).map((i: any) => ({
          id: i.id,
          title: i.title,
          description: i.description,
          severity: i.severity || 'P3',
          status: i.status || 'OPEN',
          createdAt: i.createdAt || new Date().toISOString(),
          updatedAt: i.updatedAt || new Date().toISOString(),
          assignedTo: i.assignedTo || null
        }));

        const merged = [...mappedLocal, ...mappedApi];

        this.incidents = merged.filter(
          (incident, index, self) =>
            index === self.findIndex(i => i.id === incident.id)
        );

        this.checkCriticalIncidents();
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  checkCriticalIncidents() {

    const criticals = this.incidents.filter(incident => {
      return (
        incident.severity === 'P1' &&
        incident.status === 'OPEN'
      );
    });

    this.criticalCount = criticals.length;
    this.hasCriticalAlert = this.criticalCount > 0;
  }

  closeBanner() {
    this.bannerVisible = false;
  }

  async openNotifications(ev: any) {

    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      translucent: true,
      componentProps: {
        hasCritical: this.hasCriticalAlert,
        criticalCount: this.criticalCount
      }
    });

    await popover.present();
  }

  goToCreateIncident() {
    this.router.navigate(['/create-incident']);
  }
}