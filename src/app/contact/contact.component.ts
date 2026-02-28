import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ContactEmailService } from './contact-email.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
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
  constructor(private readonly contactEmailService: ContactEmailService) {}

  focusState = 'normal';
  sending = false;
  submitError = '';

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

  async onSubmit(contactForm: NgForm) {
    if (contactForm.invalid || this.sending) {
      return;
    }

    this.sending = true;
    this.submitError = '';

    try {
      await this.contactEmailService.sendInquiry(this.formData);
      alert('Thank you for your message! We will get back to you soon.');
      this.formData = {
        name: '',
        email: '',
        inquiryType: '',
        message: ''
      };
      contactForm.resetForm();
    } catch {
      this.submitError = 'We could not send your message right now. Please try again in a moment.';
    } finally {
      this.sending = false;
    }
  }
}
