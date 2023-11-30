import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fact, FactService } from '../../services/fact.service';

@Component({
  selector: 'app-fact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>{{ fact }}</p>
  `,
  styles: `
    p { text-align: center; font-size: 15px; }
  `
})
export class FactComponent implements OnInit {

  fact = 'Teste';
  factService = inject(FactService);

  ngOnInit(): void {
    this.factService.get().subscribe((factObj: Fact) => {
      this.fact = factObj.fact;
    });
  }
}
