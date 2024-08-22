/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MasterSetupService } from './master-setup.service';

describe('Service: MasterSetup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterSetupService],
    });
  });

  it('should ...', inject(
    [MasterSetupService],
    (service: MasterSetupService) => {
      expect(service).toBeTruthy();
    },
  ));
});
