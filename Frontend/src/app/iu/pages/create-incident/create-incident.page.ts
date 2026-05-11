import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonInput,
  IonButtons,
  IonButton,
  IonIcon,
  IonTextarea,
  IonSelect,
  IonSelectOption
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.page.html',
  styleUrls: ['./create-incident.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonInput,
    IonButtons,
    IonButton,
    IonIcon,
    IonTextarea,
    IonSelect,
    IonSelectOption
  ]
})
export class CreateIncidentPage implements OnInit {

  incidentForm!: FormGroup;

  severities = [
    {
      value: 'P1',
      title: 'Crítica',
      description: 'Impacto severo en el negocio o servicio'
    },
    {
      value: 'P2',
      title: 'Alta',
      description: 'Impacto importante pero con workaround'
    },
    {
      value: 'P3',
      title: 'Media',
      description: 'Impacto menor, sin urgencia'
    }
  ];

  users: string[] = ['Carlos', 'Ana', 'Luis'];

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {

    this.incidentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      severity: ['', Validators.required],
      assignedTo: ['']
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/home');
  }

  async createIncident() {

    if (this.incidentForm.invalid) {

      this.incidentForm.markAllAsTouched();

      const toast = await this.toastCtrl.create({
        message: 'Debes completar los campos obligatorios',
        duration: 2000,
        color: 'danger'
      });

      await toast.present();
      return;
    }

    const formValue = this.incidentForm.value;

    const newIncident = {
      id: crypto.randomUUID(),
      title: formValue.title,
      description: formValue.description,
      severity: formValue.severity,
      assignedTo: formValue.assignedTo || null,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const incidents = JSON.parse(
      localStorage.getItem('incidents') || '[]'
    );

    incidents.unshift(newIncident);

    localStorage.setItem(
      'incidents',
      JSON.stringify(incidents)
    );

    const notifications = JSON.parse(
      localStorage.getItem('notifications') || '[]'
    );

    notifications.unshift({
      id: crypto.randomUUID(),
      message: `Nuevo incidente creado: ${newIncident.title}`,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem(
      'notifications',
      JSON.stringify(notifications)
    );

    const toast = await this.toastCtrl.create({
      message: 'Incidente creado correctamente',
      duration: 2000,
      color: 'success'
    });

    await toast.present();

    this.navCtrl.navigateBack('/tabs/home');
  }
}