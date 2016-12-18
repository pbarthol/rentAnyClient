/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PasswordchangeService } from './passwordchange.service';

describe('Service: Passwordchange', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordchangeService]
    });
  });

  it('should ...', inject([PasswordchangeService], (service: PasswordchangeService) => {
    expect(service).toBeTruthy();
  }));
});
