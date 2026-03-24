import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  setPageMeta(pageTitle: string, description: string, keywords?: string): void {
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }
  }

  injectJsonLd(schema: Record<string, unknown> | Record<string, unknown>[]): void {
    this.removeJsonLd();
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'structured-data';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  removeJsonLd(): void {
    const existing = this.document.getElementById('structured-data');
    if (existing) {
      existing.remove();
    }
  }
}
