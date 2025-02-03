import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })), // Initial state
      transition(':enter', [
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' })) // Animate in
      ])
    ]),
    trigger('bounce', [
      state('void', style({ transform: 'scale(1)' })), // Initial state
      transition(':enter', [
        animate('0.5s ease-in-out', style({ transform: 'scale(1.1)' })), // Scale up
        animate('0.5s ease-in-out', style({ transform: 'scale(1)' })) // Scale down
      ])
    ])
  ]
})
export class HomeComponent {}
