import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader">
      <img [src]="loadingImg" alt="Loading..." />
    </div>
  `,
})
export class PageLoaderComponent {
  loadingImg = 'https://cdn.auth0.com/blog/hello-auth0/loader.svg';
}
