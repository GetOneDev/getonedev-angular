import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [
    trigger('focusEffect', [
      state('normal', style({ transform: 'scale(1)' })),
      state('focused', style({ transform: 'scale(1.02)' })),
      transition('normal <=> focused', animate('0.2s ease-in-out'))
    ])
  ]
})
export class ContactComponent {
  focusState = 'normal';

  onFocus() {
    this.focusState = 'focused';
  }

  onBlur() {
    this.focusState = 'normal';
  }

  formData = {
    name: '',
    email: '',
    inquiryType: '',
    message: ''
  };

  onSubmit() {
    console.log('Form Data:', this.formData);

    alert('Thank you for your message! We will get back to you soon.');
  }
}
