import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules
} from '@angular/router';

import {
  IonicRouteStrategy,
  provideIonicAngular
} from '@ionic/angular/standalone';

import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { IncidentRepository } from './app/domain/repositories/incident.repository';
import { IncidentRepositoryImpl } from './app/data/repositories/incident.repository.impl';

import { httpErrorInterceptor } from './app/core/interceptors/http-error-interceptor';

import { addIcons } from 'ionicons';

import {
  notificationsOutline,
  chevronForwardOutline,
  timeOutline,
  checkmarkDoneOutline,
  checkmarkCircleOutline,
  addOutline,
  arrowBackOutline,
  ellipsisVerticalOutline,
  documentTextOutline,
  flagOutline,
  personOutline,
  calendarOutline,
  arrowBack,
  add
} from 'ionicons/icons';

addIcons({
  'notifications-outline': notificationsOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'time-outline': timeOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'add-outline': addOutline,
  'arrow-back-outline': arrowBackOutline,
  'ellipsis-vertical-outline': ellipsisVerticalOutline,
  'document-text-outline': documentTextOutline,
  'flag-outline': flagOutline,
  'person-outline': personOutline,
  'calendar-outline': calendarOutline,
  'arrow-back': arrowBack,
  'add': add
});

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },

    importProvidersFrom(IonicModule.forRoot()),

    provideIonicAngular(),

    provideRouter(routes, withPreloading(PreloadAllModules)),

    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    ),

    {
      provide: IncidentRepository,
      useClass: IncidentRepositoryImpl
    }
  ],
});