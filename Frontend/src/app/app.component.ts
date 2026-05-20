import { Component } from '@angular/core';
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterLink} from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [IonRouterOutlet, 
    IonApp,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    RouterLink,
    IonRouterOutlet
  ]
})
export class AppComponent {
}
