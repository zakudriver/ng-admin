import { TestBed } from '@angular/core/testing';

import { VimService } from './vim.service';

describe('VimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VimService = TestBed.get(VimService);
    expect(service).toBeTruthy();
  });
});
