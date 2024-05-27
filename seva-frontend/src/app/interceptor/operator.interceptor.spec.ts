import { TestBed } from '@angular/core/testing';

import { OperatorInterceptor } from './operator.interceptor';

describe('OperatorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OperatorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OperatorInterceptor = TestBed.inject(OperatorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
