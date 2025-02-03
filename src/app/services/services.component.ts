import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  animations: [
    trigger('hoverEffect', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.05)' })),
      transition('normal <=> hovered', animate('0.3s ease-in-out'))
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })), // Initial state
      transition(':enter', [
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' })) // Animate in
      ])
    ]),
  ]
})
export class ServicesComponent {
  hoverState = 'normal';

  onHover() {
    this.hoverState = 'hovered';
  }

  onLeave() {
    this.hoverState = 'normal';
  }
}
