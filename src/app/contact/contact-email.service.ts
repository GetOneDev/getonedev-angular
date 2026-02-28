import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

import { environment } from '../../environments/environment';

export interface ContactFormPayload {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactEmailService {
  sendInquiry(payload: ContactFormPayload): Promise<void> {
    const { serviceId, templateId, publicKey, toEmail } = environment.emailjs;

    return emailjs
      .send(
        serviceId,
        templateId,
        {
          name: payload.name,
          email: payload.email,
          title: payload.inquiryType,
          time: new Date().toLocaleString(),
          to_email: toEmail,

          from_name: payload.name,
          from_email: payload.email,
          inquiry_type: payload.inquiryType,
          message: payload.message,
          reply_to: payload.email
        },
        {
          publicKey
        }
      )
      .then(() => undefined);
  }
}
