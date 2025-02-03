import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('linkAnimation', [
      state('normal', style({ transform: 'scale(1)' })),
      state('clicked', style({ transform: 'scale(1.1)' })),
      transition('normal <=> clicked', animate('0.2s ease-in-out'))
    ])
  ]
})
export class AppComponent {
  title = 'GetOneDev, LLC';
  linkState = 'normal';
  onLinkClick() {
    this.linkState = 'clicked';
    setTimeout(() => {
      this.linkState = 'normal'; // Reset after animation
    }, 200);
  }
}
