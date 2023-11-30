import { FactService } from './../../services/fact.service';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FactComponent } from './fact.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('FactComponent', () => {
  let component: FactComponent;
  let fixture: ComponentFixture<FactComponent>;
  let factService;

  let factServiceSpy = jasmine.createSpyObj('FactService', ['get']);

  beforeEach(async () => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [FactComponent],
      providers: [
        { provide: FactService, useValue: factServiceSpy },
        { provide: HttpClient, useValue: httpClientSpyObj }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactComponent);
    component = fixture.componentInstance;
    factServiceSpy.get.and.returnValue(of({ fact: 'Teste', length: 5 }));

    factService = TestBed.inject(FactService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit must change fact value', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(factServiceSpy.get).toHaveBeenCalled();
    expect(component.fact).toEqual('Teste');
  }));
});
