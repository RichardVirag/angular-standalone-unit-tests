import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Fact {
  fact: string;
  length: number;
}

@Injectable({
  providedIn: 'root'
})
export class FactService {

  http = inject(HttpClient);

  get(): Observable<Fact> {
    return this.http.get<Fact>('https://catfact.ninja/fact');
  }
}
