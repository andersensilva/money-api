import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nao-autorizado',
  template: `
    <div class="container">
      <h1>Você não possue autorização para isso!</h1>
    </div>
  `,
  styles: [
  ]
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
