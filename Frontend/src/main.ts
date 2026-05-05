import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
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
  calendarOutline
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
  'calendar-outline': calendarOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot()),

    provideIonicAngular(),

    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});