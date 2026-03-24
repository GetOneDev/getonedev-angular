import { afterNextRender, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ServicesComponent } from './services/services.component';
import { FadeInDirective } from './shared/fade-in.directive';
import { SeoService } from './shared/seo.service';

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
  isDesktopWide = signal(window.innerWidth > 1080);
  showIntro = signal(true);
  introFadingOut = signal(false);
  introProgress = signal(0);
  logoVisible = signal(false);

  private animationId = 0;
  private resizeHandler = () => this.resizeCanvas();
  private introTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private seoService: SeoService) {
    this.injectStructuredData();
    afterNextRender(() => {
      this.runIntroAnimation();
      this.setupScrollSpy();
      this.initMatrixRain();
      this.updateViewportFlags();
      window.addEventListener('resize', this.resizeHandler);
    });
  }

  private injectStructuredData(): void {
    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Nabeel Siddiqui',
        jobTitle: 'Full Stack Developer',
        url: 'https://getonedev.com/',
        email: 'nabeel@getonedev.com',
        sameAs: [
          'https://github.com/nsiddiqui25',
          'https://www.linkedin.com/in/nsiddiqui25/'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'GetOneDev, LLC',
        url: 'https://getonedev.com/',
        founder: {
          '@type': 'Person',
          name: 'Nabeel Siddiqui'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'nabeel@getonedev.com',
          contactType: 'customer service'
        }
      }
    ];
    this.seoService.injectJsonLd(schemas);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resizeHandler);
    if (this.introTimer) clearTimeout(this.introTimer);
  }

  scrollTo(sectionId: string) {
    this.mobileMenuOpen.set(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((current) => !current);
  }

  private runIntroAnimation() {
    // Total animation: ~2000ms fill, then 400ms fade out
    const duration = 2000;
    const start = performance.now();

    // Logo fades in at 20% progress, fades out at 80%
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      this.introProgress.set(Math.round(progress * 100));

      // Logo visibility: fade in at 20%, fade out at 80%
      if (progress >= 0.2 && progress < 0.8) {
        this.logoVisible.set(true);
      } else if (progress >= 0.8) {
        this.logoVisible.set(false);
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Hold briefly then fade out overlay
        this.introTimer = setTimeout(() => {
          this.introFadingOut.set(true);
          this.introTimer = setTimeout(() => {
            this.showIntro.set(false);
          }, 600);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
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
    let lastRows: number[];

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
      lastRows = Array.from({ length: columns }, () => -1);
    };

    initDrops();
    (this as any)._reinitDrops = initDrops;

    let lastTime = 0;
    const frameInterval = 80;

    const draw = (timestamp: number) => {
      this.animationId = requestAnimationFrame(draw);

      if (timestamp - lastTime < frameInterval) return;
      lastTime = timestamp;

      ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const currentRow = Math.floor(drops[i]);
        if (currentRow !== lastRows[i]) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillStyle = '#64ffda';
          ctx.globalAlpha = 0.9;
          ctx.fillText(char, x, y);

          lastRows[i] = currentRow;
        }

        const y = drops[i] * fontSize;

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
    this.updateViewportFlags();
  }

  private updateViewportFlags() {
    this.isDesktopWide.set(window.innerWidth > 1080);
  }
}
