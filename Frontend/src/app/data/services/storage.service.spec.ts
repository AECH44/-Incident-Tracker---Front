import { TestBed } from '@angular/core/testing';

import { StorageService }
  from './storage.service';

import { Incident }
  from 'src/app/core/models/incident.model';

import { Severity }
  from 'src/app/core/enums/severity.enum';

import { Status }
  from 'src/app/core/enums/status.enum';

describe('StorageService', () => {

  let service: StorageService;

  const mockIncident: Incident = {

    id: '1',

    title: 'Test Incident',

    description: 'Testing storage service',

    severity: Severity.P1,

    status: Status.OPEN,

    assignedTo: null,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString()
  };

  beforeEach(() => {

    TestBed.configureTestingModule({});

    service = TestBed.inject(StorageService);

    localStorage.clear();
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should save incidents in localStorage', () => {

    service.saveIncidents([mockIncident]);

    const incidents =
      service.getIncidents();

    expect(incidents.length)
      .toBe(1);

    expect(incidents[0].title)
      .toBe('Test Incident');
  });

  it('should add a new incident', () => {

    service.addIncident(mockIncident);

    const incidents =
      service.getIncidents();

    expect(incidents.length)
      .toBe(1);

    expect(incidents[0].id)
      .toBe('1');
  });

  it('should update an incident', () => {

    service.saveIncidents([mockIncident]);

    const updatedIncident: Incident = {

      ...mockIncident,

      status: Status.RESOLVED
    };

    service.updateIncident(
      updatedIncident
    );

    const incidents =
      service.getIncidents();

    expect(incidents[0].status)
      .toBe(Status.RESOLVED);
  });

  it('should return empty array on invalid JSON', () => {

    spyOn(localStorage, 'getItem')
      .and.returnValue('invalid-json');

    const incidents =
      service.getIncidents();

    expect(incidents).toEqual([]);
  });
});