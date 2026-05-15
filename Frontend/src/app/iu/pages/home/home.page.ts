import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Incident } from 'src/app/core/models/incident.model';

import { IncidentCardComponent } from '../../components/incident-card/incident-card.component';

import { GetIncidentsUseCase } from 'src/app/domain/use-cases/get-incidents.usecase';
import { ListenIncidentsUseCase } from 'src/app/domain/use-cases/listen-incidents.usecase';

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
export class HomePage implements OnInit, OnDestroy {

  incidents: Incident[] = [];

  loading = true;
  error = false;

  hasCriticalAlert = false;
  criticalCount = 0;

  bannerVisible = true;

  private popoverCtrl = inject(PopoverController);
  private router = inject(Router);

  private incidentsSubscription?: Subscription;
  private sseSubscription?: Subscription;

  constructor(
    private getIncidentsUseCase: GetIncidentsUseCase,
    private listenIncidentsUseCase: ListenIncidentsUseCase
  ) {}

  ngOnInit() {

    this.loadIncidents();

    this.listenRealtimeIncidents();
  }

  ionViewWillEnter() {
    this.loadIncidents();
  }

  ngOnDestroy() {

    this.incidentsSubscription?.unsubscribe();

    this.sseSubscription?.unsubscribe();
  }

  loadIncidents() {

    this.loading = true;

    this.incidentsSubscription = this.getIncidentsUseCase.execute().subscribe({

      next: (data) => {

        const localIncidents = JSON.parse(
          localStorage.getItem('incidents') || '[]'
        );

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

        // incidentes de la api o los mocks
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

      error: (err) => {

        console.error('Error loading incidents', err);

        this.error = true;

        this.loading = false;
      }
    });
  }

  listenRealtimeIncidents() {

    this.sseSubscription = this.listenIncidentsUseCase
      .execute()
      .subscribe({

        next: (incident: Incident) => {

          console.log('📡 SSE Incident received:', incident);

          const exists = this.incidents.some(
            i => i.id === incident.id
          );

          if (!exists) {

            this.incidents.unshift(incident);

            this.checkCriticalIncidents();
          }
        },

        error: (err) => {

          console.error('SSE connection error', err);
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