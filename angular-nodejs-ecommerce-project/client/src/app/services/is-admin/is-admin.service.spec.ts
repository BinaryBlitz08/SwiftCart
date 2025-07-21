import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { IsAdminService } from './is-admin.service';

describe('IsAdminService', () => {
  let service: IsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
