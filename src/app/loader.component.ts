import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="loader-container">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`,
  styles: [
    `
      .loader-container {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class LoaderComponent {}
