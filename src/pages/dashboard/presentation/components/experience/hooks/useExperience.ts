import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const useExperience = () => {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomActionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pin the Experience section so GetInTouch scrolls over it
    ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
    });

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }

    // Experience cards staggered animation
    experienceRefs.current.forEach((card) => {
      if (!card) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate the entire card with fade and slide
      timeline.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
      );

      // Animate the timeline year
      const yearElement = card.querySelector('.year-text');
      if (yearElement) {
        timeline.fromTo(
          yearElement,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.6',
        );
      }

      // Animate the role title
      const roleElement = card.querySelector('.role-title');
      if (roleElement) {
        timeline.fromTo(
          roleElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          },
          '-=0.5',
        );
      }

      // Animate the company name
      const companyElement = card.querySelector('.company-name');
      if (companyElement) {
        timeline.fromTo(
          companyElement,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.5',
        );
      }

      // Animate the description
      const descriptionElement = card.querySelector('.description-text');
      if (descriptionElement) {
        timeline.fromTo(
          descriptionElement,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          },
          '-=0.4',
        );
      }

      // Animate the index number
      const indexElement = card.querySelector('.index-number');
      if (indexElement) {
        timeline.fromTo(
          indexElement,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          '-=0.6',
        );
      }

      // Add hover effect for the dot
      const dotElement = card.querySelector('.company-dot');
      if (dotElement) {
        card.addEventListener('mouseenter', () => {
          gsap.to(dotElement, {
            scale: 1.5,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(dotElement, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    });

    // Bottom action animation
    if (bottomActionRef.current) {
      gsap.fromTo(
        bottomActionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bottomActionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Animate the download link on hover
      const downloadLink = bottomActionRef.current.querySelector('.download-link');
      if (downloadLink) {
        downloadLink.addEventListener('mouseenter', () => {
          gsap.to(downloadLink.querySelector('.download-arrow'), {
            y: 5,
            duration: 0.3,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
          });
        });

        downloadLink.addEventListener('mouseleave', () => {
          gsap.killTweensOf(downloadLink.querySelector('.download-arrow'));
          gsap.to(downloadLink.querySelector('.download-arrow'), {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    }
  }, []);

  return { titleRef, experiences, bottomActionRef, experienceRefs, rootRef };
};

const experiences = [
  {
    year: '2024 - Present',
    role: 'Senior App Developer',
    company: 'Tech Solutions Inc.',
    description:
      'Developed and maintained high-quality mobile applications with a focus on performance and user experience. Led a team of developers in architecting scalable solutions, implementing advanced features, and optimizing code for efficiency. Collaborated closely with product managers and designers to deliver seamless user interfaces and ensure alignment with business goals. Conducted code reviews, mentored junior developers, and established best practices for mobile development across the organization.',
  },
  {
    year: '2022 - 2024',
    role: 'App Developer',
    company: 'Tech Solutions Inc.',
    description:
      'Collaborated with cross-functional teams to design, develop, and deploy mobile applications for both iOS and Android platforms. Participated in the full software development lifecycle, from requirements gathering and prototyping to testing and deployment. Worked with UI/UX designers to translate wireframes into interactive features, and integrated third-party APIs to enhance app functionality. Provided ongoing maintenance, bug fixes, and performance improvements based on user feedback and analytics.',
  },
];
