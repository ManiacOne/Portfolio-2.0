import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const useProjectV2 = () => {
  // Refs
  const projectRootRef = useRef<HTMLDivElement>(null);
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const appProjectContainerRef = useRef<HTMLDivElement>(null);
  const websiteProjectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressIndicatorRef = useRef<HTMLSpanElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);

  // Filter projects
  const apps = projects.filter((p) => p.type === 'app');
  const websites = projects.filter((p) => p.type === 'website');

  useGSAP(() => {
    if (!projectRootRef.current || !appProjectContainerRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: projectRootRef.current,
        start: 'top top',
        end: `+=${projectRootRef.current.scrollWidth}`,
        scrub: true,
        pin: true,
        onUpdate: () => {
          // Update progress indicator based on horizontal scroll progress
          if (progressIndicatorRef.current && appProjectContainerRef.current) {
            const scrollDistance = appProjectContainerRef.current.scrollWidth - window.innerWidth;
            const currentX = gsap.getProperty(appProjectContainerRef.current, 'x') as number;
            const progress = Math.abs(currentX) / scrollDistance;

            const opacity = gsap.getProperty(appProjectContainerRef.current, 'opacity');
            if (progress <= 1 && Number(opacity) > 0.5) {
              gsap.to(progressIndicatorRef.current, {
                width: `${progress * 100}%`,
                duration: 0.1,
                ease: 'none',
              });
            }
          }
        },
      },
    });

    timeline
      .set(websiteProjectsRef.current, { visibility: 'hidden', y: window.innerHeight })
      .to(appProjectContainerRef.current, {
        delay: 0.05,
        ease: 'none',
        stagger: 1,
        duration: 1,
        x: -(appProjectContainerRef.current.scrollWidth - window.innerWidth),
      })
      .to(
        websiteProjectsRef.current,
        {
          visibility: 'visible',
          stagger: 0.5,
        },
        'a',
      )
      .to(
        appProjectContainerRef.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        'a+=0.3',
      )
      .to(
        progressContainerRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        'a+=0.1',
      )
      .to(
        websiteProjectsRef.current,
        {
          y: (i) => i * 20,
          stagger: 0.5,
        },
        'a',
      );

  }, []);

  return {
    projectRootRef,
    pageTitleRef,
    appProjectContainerRef,
    apps,
    websites,
    websiteProjectsRef,
    progressIndicatorRef,
    progressContainerRef,
  };
};

export interface IProject {
  id: number;
  name: string;
  description: string;
  type: 'website' | 'app';
  image: string;
  categories: string[];
  technologies: string[];
}

const projects: IProject[] = [
  {
    id: 0,
    name: 'Fitness Tracker App',
    description:
      'Mobile-first fitness tracking application with workout plans, nutrition tracking, and progress analytics. Features real-time synchronization, social sharing, and personalized coaching recommendations.',
    type: 'app',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80',
    categories: ['Mobile App', 'Health & Fitness'],
    technologies: ['React Native', 'TypeScript', 'Firebase', 'HealthKit'],
  },
  {
    id: 1,
    name: 'Task Manager Pro',
    description:
      'Productivity app designed for teams with real-time collaboration, task dependencies, and intelligent scheduling. Streamlines project management with intuitive interface and powerful automation.',
    type: 'app',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80',
    categories: ['Productivity', 'Collaboration'],
    technologies: ['Flutter', 'Dart', 'GraphQL', 'PostgreSQL'],
  },
  {
    id: 3,
    name: 'Fitness Tracker App',
    description:
      'Mobile-first fitness tracking application with workout plans, nutrition tracking, and progress analytics. Features real-time synchronization, social sharing, and personalized coaching recommendations.',
    type: 'app',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80',
    categories: ['Mobile App', 'Health & Fitness'],
    technologies: ['React Native', 'TypeScript', 'Firebase', 'HealthKit'],
  },
  {
    id: 4,
    name: 'Task Manager Pro',
    description:
      'Productivity app designed for teams with real-time collaboration, task dependencies, and intelligent scheduling. Streamlines project management with intuitive interface and powerful automation.',
    type: 'app',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80',
    categories: ['Productivity', 'Collaboration'],
    technologies: ['Flutter', 'Dart', 'GraphQL', 'PostgreSQL'],
  },
  {
    id: 5,
    name: 'Portfolio Showcase',
    description:
      'An immersive portfolio website with stunning animations and 3D interactions. Showcases creative work through innovative scroll-driven narratives and interactive storytelling elements.',
    type: 'website',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80',
    categories: ['Portfolio', 'UI/UX Design'],
    technologies: ['React', 'GSAP', 'Three.js', 'Tailwind'],
  },
  {
    id: 5,
    name: 'E-Commerce Platform',
    description:
      'A modern e-commerce platform featuring real-time inventory management, seamless checkout experience, and advanced product filtering. Built with cutting-edge technologies to ensure optimal performance and user experience across all devices.',
    type: 'website',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    categories: ['Web Development', 'E-Commerce'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    id: 5,
    name: 'Portfolio Showcase',
    description:
      'An immersive portfolio website with stunning animations and 3D interactions. Showcases creative work through innovative scroll-driven narratives and interactive storytelling elements.',
    type: 'website',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80',
    categories: ['Portfolio', 'UI/UX Design'],
    technologies: ['React', 'GSAP', 'Three.js', 'Tailwind'],
  },
  {
    id: 6,
    name: 'Portfolio Showcase',
    description:
      'An immersive portfolio website with stunning animations and 3D interactions. Showcases creative work through innovative scroll-driven narratives and interactive storytelling elements.',
    type: 'website',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80',
    categories: ['Portfolio', 'UI/UX Design'],
    technologies: ['React', 'GSAP', 'Three.js', 'Tailwind'],
  },
];
