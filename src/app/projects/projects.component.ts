import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  github: string;
  demo?: string;
  tag?: string;
  image: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  private scrollObserver!: IntersectionObserver;
  projects: Project[] = [
    {
      id: 1,
      title: 'SmartQR',
      description: 'A powerful QR code generation, management, and analytics platform. Built for businesses and individuals who need reliable QR code solutions.',
      techStack: ['Spring Boot', 'Angular', 'AWS', 'PostgreSQL', 'ci/cd'],
      github: 'https://github.com/Arcsgit/Smartqr',
      demo: 'https://smartqr-code.site',
      tag: "latest",
      image: 'assets/landing-pages/smartqr.png'
    },
    {
      id: 2,
      title: 'GPU Resource Management',
      description: "Built for KLE Technological University's Central Computing Facility to streamline access to high-performance computing resources",
      techStack: ['Spring Boot', 'Angular', 'SMTP', 'Oracle DB'],
      github: 'https://github.com/Arcsgit/gpu-resource-management-system',
      image: 'assets/landing-pages/access-mgmt.png'
    },
    {
      id: 3,
      title: 'Synthetic Log Generation System',
      description: 'FastAPI-based REST service that generates realistic, production-grade Google Cloud Platform audit logs',
      techStack: ['Python', 'FastAPI', 'Rust + Axum'],
      github: 'https://github.com/Arcsgit/gcp-synthetic-log-generator.git',
      image: 'assets/landing-pages/gcp-log.png'
    },
    {
      id: 4,
      title: 'RapidRoute',
      description: 'A modern route optimization platform built with Angular, featuring real-time tracking, responsive design, and advanced algorithm implementation for efficient delivery management.',
      techStack: ['Angular', 'TypeScript', 'HTML', 'CSS',],
      github: 'https://github.com/Arcsgit/rapidroute',
      demo: 'https://rapidroute-x5h1.onrender.com',
      image: 'assets/landing-pages/rapidroute.png'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Personal portfolio with custom animations, dark theme, and interactive UI elements showcasing projects and skills.',
      techStack: ['Angular', 'TypeScript', 'GSAP'],
      github: 'https://github.com/Arcsgit/portfolio',
      demo: 'https://architshet.onrender.com',
      image: 'assets/landing-pages/portfolio.png'
    },
  ];

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.setupScrollAnimation();
    this.setupMagneticEffect();
  }

  ngOnDestroy(): void {
    if (this.scrollObserver) this.scrollObserver.disconnect();
  }

  setupScrollAnimation(): void {
    const cards = document.querySelectorAll('.project-card');
    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in');
          else entry.target.classList.remove('animate-in');
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    cards.forEach((card) => this.scrollObserver.observe(card));
  }

  setupMagneticEffect(): void {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card: any) => {
      const image = card.querySelector('.project-image');
      const spotlight = card.querySelector('.spotlight');

      card.addEventListener('mousemove', (e: MouseEvent) => {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const deltaX = (x - centerX) / centerX;
          const deltaY = (y - centerY) / centerY;

          if (image) {
            const moveX = deltaX * 12;
            const moveY = deltaY * 12;
            image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
          }

          if (spotlight) {
            spotlight.style.left = `${x}px`;
            spotlight.style.top = `${y}px`;
          }

          const rotateY = deltaX * 2;
          const rotateX = -deltaY * 2;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        if (image) image.style.transform = 'translate(0, 0) scale(1)';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      });
    });
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }
}
