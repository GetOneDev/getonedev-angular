import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactEmailService } from './contact-email.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(private readonly contactEmailService: ContactEmailService) {}

  sending = false;
  submitError = '';

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
      alert("Thanks for reaching out! I'll get back to you soon.");
      this.formData = {
        name: '',
        email: '',
        inquiryType: '',
        message: ''
      };
      contactForm.resetForm();
    } catch {
      this.submitError = "Couldn't send your message right now. Please try again in a moment.";
    } finally {
      this.sending = false;
    }
  }
}
