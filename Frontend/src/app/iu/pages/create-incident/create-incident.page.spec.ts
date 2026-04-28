import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateIncidentPage } from './create-incident.page';

describe('CreateIncidentPage', () => {
  let component: CreateIncidentPage;
  let fixture: ComponentFixture<CreateIncidentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIncidentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
