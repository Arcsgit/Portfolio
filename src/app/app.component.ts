import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Portfolio';
  constructor(@Inject(DOCUMENT) private document: Document) { }
  goToLinktree(): void { this.document.location.href = 'https://linktr.ee/archit6'; }
}
