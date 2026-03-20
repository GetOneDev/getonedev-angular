import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  url: string;
  technologies: string[];
  featured: boolean;
  image: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  readonly projects: Project[] = [
    {
      title: 'MIT Bitcoin Expo 2026',
      description: 'Official website for the 13th Annual MIT Bitcoin Expo — a 2-day conference and 36-hour hackathon bringing together blockchain innovators, researchers, and builders from around the world.',
      url: 'https://mitbitcoinexpo.org/',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
      featured: true,
      image: 'assets/portfolio/mit bitcoin expo.png'
    },
    {
      title: 'PassVault',
      description: 'Zero-knowledge password manager with military-grade browser-side encryption. Keeps passwords secure without ever sending sensitive data to the server.',
      url: 'https://passvault-frontend.vercel.app/about',
      technologies: ['React', 'Node.js', 'Encryption', 'Vercel'],
      featured: true,
      image: 'assets/portfolio/passvault.png'
    },
    {
      title: 'Halcyon Theme',
      description: 'A minimal dark blue theme for VS Code, Sublime Text, Atom, iTerm2, and more. Loved by over 100,000 developers with installs across multiple editors and terminals.',
      url: 'https://halcyon-theme.netlify.app/',
      technologies: ['VS Code', 'Sublime Text', 'Atom', 'iTerm2'],
      featured: true,
      image: 'assets/portfolio/halcyon.png'
    },
    {
      title: 'FundFlow',
      description: 'Crowdfunding platform enabling creators and entrepreneurs to launch projects and rally community support. Features campaign management, progress tracking, and secure contribution flow.',
      url: 'https://fundflow-crowdfunding.vercel.app/',
      technologies: ['React', 'Node.js', 'MongoDB', 'Vercel'],
      featured: true,
      image: 'assets/portfolio/fundflow.png'
    },
    {
      title: 'Palestine Stance',
      description: 'AI-powered transparency tool that analyzes and surfaces public figures\' and companies\' stances on the Palestinian-Israeli conflict using natural language processing.',
      url: 'https://palestinestance.vercel.app/',
      technologies: ['AI/NLP', 'React', 'Next.js', 'Vercel'],
      featured: true,
      image: 'assets/portfolio/palestine stance.png'
    },
    {
      title: 'LeafLinks',
      description: 'Free link-in-bio platform for sharing multiple links through one beautifully personalized page. Clean, fast, and designed for creators and professionals.',
      url: 'https://leaflink-rouge.vercel.app/',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
      featured: true,
      image: 'assets/portfolio/leaflinks.png'
    }
  ];
}
