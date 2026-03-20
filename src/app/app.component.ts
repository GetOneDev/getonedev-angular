import { afterNextRender, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
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
export class AppComponent implements OnDestroy {
  title = 'GetOneDev, LLC';

  @ViewChild('matrixCanvas', { static: false }) matrixCanvas!: ElementRef<HTMLCanvasElement>;

  mobileMenuOpen = signal(false);
  activeSection = signal('');

  private animationId = 0;
  private resizeHandler = () => this.resizeCanvas();

  constructor() {
    afterNextRender(() => {
      this.setupScrollSpy();
      this.initMatrixRain();
      window.addEventListener('resize', this.resizeHandler);
    });
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resizeHandler);
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

  private initMatrixRain() {
    const canvas = this.matrixCanvas?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = '0123456789012345678901234567890123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';
    const fontSize = 14;
    let columns: number;
    let drops: number[];
    let speeds: number[];

    const initDrops = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -100);
      speeds = Array.from({ length: columns }, () => {
        const r = Math.random();
        if (r < 0.05) return 3;
        if (r < 0.35) return 2;
        return 1;
      });
    };

    initDrops();
    (this as any)._reinitDrops = initDrops;

    let lastTime = 0;
    const frameInterval = 80; // ms between frames

    const draw = (timestamp: number) => {
      this.animationId = requestAnimationFrame(draw);

      if (timestamp - lastTime < frameInterval) return;
      lastTime = timestamp;

      // Semi-transparent black to create fade/trail effect
      ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character - bright teal
        ctx.fillStyle = '#64ffda';
        ctx.globalAlpha = 0.9;
        ctx.fillText(char, x, y);

        // Trail characters fade out - drawn by the background overlay naturally

        // Reset drop to top randomly after it passes the screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += (0.3 + Math.random() * 0.2) * speeds[i];
      }

      ctx.globalAlpha = 1;
    };

    requestAnimationFrame(draw);
  }

  private resizeCanvas() {
    const reinit = (this as any)._reinitDrops;
    if (reinit) reinit();
  }
}
