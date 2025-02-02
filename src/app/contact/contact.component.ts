import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
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
