import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface ExperienceEntry {
  company: string;
  title: string;
  dateRange: string;
  url?: string;
  points: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  readonly experiences: readonly ExperienceEntry[] = [
    {
      company: 'Al Rafay Consulting',
      title: 'Senior DevOps Consultant',
      dateRange: 'Sep 2025 – Present',
      points: [
        'Serving as Senior DevOps Consultant on a contract basis, driving infrastructure modernization and cloud deployment strategies',
        'Designing and implementing CI/CD pipelines to streamline software delivery and improve release velocity',
        'Collaborating with engineering teams to adopt DevOps best practices, containerization, and automated testing workflows'
      ]
    },
    {
      company: 'Great American Insurance',
      title: 'Application Engineer',
      dateRange: 'May 2019 – Present',
      points: [
        'Design, develop, and maintain enterprise-grade applications supporting insurance operations across multiple business lines',
        'Designed, coded, tested, debugged, documented, and maintained application programs written in Angular, JavaScript, C#, VB.NET, and SQL',
        'Created and maintained RESTful APIs using Entity Framework Core and LINQ to support business-critical data operations',
        'Prepared detailed design specifications and contributed to the full software development lifecycle from requirements through deployment',
        'Collaborate with cross-functional teams to define technical requirements and deliver scalable application features',
        'Lead code reviews and contribute to architectural decisions for modernizing legacy systems'
      ]
    },
    {
      company: 'Point Of Solutions',
      title: 'Front-End Development Instructor',
      dateRange: 'Aug 2018 – Dec 2019',
      points: [
        'Taught front-end web development curriculum to students in a part-time training environment in Warrenville, IL',
        'Covered modern HTML, CSS, JavaScript, and front-end frameworks to prepare students for entry-level development roles',
        'Created course materials, exercises, and project assignments to reinforce practical coding skills'
      ]
    },
    {
      company: 'Get1Geek',
      title: 'Application Engineer',
      dateRange: 'Oct 2015 – Apr 2019',
      points: [
        'Worked as a part-time Application Engineer serving clients across the Greater Chicago Area',
        'Built and maintained web applications and provided technical support across a range of client engagements',
        'Developed front-end and back-end features to meet business requirements for small and mid-sized businesses'
      ]
    },
    {
      company: 'Verizon Connect',
      title: 'Front-End Developer',
      dateRange: 'Jan 2019 – Mar 2019',
      points: [
        'Contributed to front-end development efforts for Verizon Connect on a contract basis in the Greater Chicago Area',
        'Built and refined UI components and features for fleet management web applications',
        'Worked within an agile team to deliver rapid iterations against feature specifications'
      ]
    },
    {
      company: 'GetOneDev, LLC',
      title: 'Founder & Full Stack Developer',
      dateRange: '2023 – Present',
      url: 'https://getonedev.com',
      points: [
        'Founded and operate a software development consultancy delivering custom web solutions for small businesses and startups',
        'Architect and build full-stack applications using Angular, .NET Core, C#, SQL Server, and Azure cloud services',
        'Design and implement responsive front-end interfaces with modern Angular features including standalone components, signals, and reactive patterns',
        'Manage end-to-end project delivery including client communication, requirements gathering, UI/UX design, development, deployment, and ongoing maintenance',
        'Provide SEO optimization, hosting management, and cloud infrastructure services for clients'
      ]
    }
  ];

  readonly selectedTab = signal(0);

  selectTab(index: number): void {
    this.selectedTab.set(index);
  }
}