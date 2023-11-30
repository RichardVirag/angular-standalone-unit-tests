import { TestBed } from '@angular/core/testing';

import { Fact, FactService } from './fact.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('FactService', () => {
  let service: FactService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        FactService,
        { provide: HttpClient, useValue: httpClientSpyObj }
      ]
    });
    service = TestBed.inject(FactService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#get must return a fact', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of({
      fact: 'Teste', length: 5
    }));

    service.get().subscribe({
      next: (fact: Fact) => {
        expect(fact).toEqual({ fact: 'Teste', length: 5 });
        done();
      },
      error: () => {
        done.fail;
      }
    });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
