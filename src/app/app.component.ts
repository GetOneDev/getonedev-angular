import { afterNextRender, Component, signal } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ServicesComponent } from './services/services.component';
import { FadeInDirective } from './shared/fade-in.directive';

@Component({
  selector: 'app-root',
  imports: [
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    PortfolioComponent,
    ServicesComponent,
    ContactComponent,
    FadeInDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GetOneDev, LLC';

  mobileMenuOpen = signal(false);
  activeSection = signal('');

  constructor() {
    afterNextRender(() => {
      this.setupScrollSpy();
    });
  }

  scrollTo(sectionId: string) {
    this.mobileMenuOpen.set(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((current) => !current);
  }

  private setupScrollSpy() {
    const sections = document.querySelectorAll('main > *[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }
}
