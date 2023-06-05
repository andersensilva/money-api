import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <div *ngIf="temErro()" class="p-message p-message-error">
            {{ text }}
          </div>
  `,
  styles: [`
    .p-messages-error {
    margin: 0;
    padding: 3px;
    margin-top: 4px;
  }
  .p-message.p-message-error{
    border: 0;
  }
  `
  ]
})
export class MessageComponent {

  @Input() error: string = '';
  @Input() control?: FormControl;
  @Input() text: string = '';

  temErro(): boolean{
    return this.control ? this.control.hasError(this.error) && this.control.dirty : true;
  }
}
