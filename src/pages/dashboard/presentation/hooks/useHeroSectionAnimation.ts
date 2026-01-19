import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const useHeroSectionAnimation = () => {
  const dashboardConainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const listenersAttached = useRef(false);
  const resetTimeout = useRef<NodeJS.Timeout | null>(null);

  useGSAP(() => {
    const reset = () => {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = dashboardConainerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const deltaX = x - lastPos.current.x;
      const deltaY = y - lastPos.current.y;
      lastPos.current = { x, y };
      gsap.to(imageRef.current, {
        x: gsap.utils.clamp(-10, 10, deltaX),
        y: gsap.utils.clamp(-3, 3, deltaY),
        duration: 0.25,
        ease: 'power3.out',
        overwrite: true,
      });
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
      resetTimeout.current = setTimeout(reset, 120);
    };

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.set(trailRef.current, { opacity: 0, filter: 'blur(8px)' })
      .set(headerRef.current, { opacity: 0, y: '-20px' })
      .fromTo(
        imageRef.current,
        {
          scale: 1.1,
          opacity: 0,
          filter: 'blur(16px)',
        },
        {
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.8,
          onComplete: () => {
            if (!listenersAttached.current && dashboardConainerRef.current) {
              dashboardConainerRef.current.addEventListener('mousemove', handleMouseMove);
              dashboardConainerRef.current.addEventListener('mouseleave', reset);
              listenersAttached.current = true;
            }
            // Show trail after image animation
            if (trailRef.current) {
              gsap.to(trailRef.current, {
                opacity: 1,
                duration: 0.7,
                ease: 'power2.out',
                filter: 'blur(0px)',
              });
              // Start the trail animation
              const lines = trailRef.current.querySelectorAll('.trail_line');
              lines.forEach((line) => {
                gsap.to(line, {
                  yPercent: -100,
                  repeat: -1,
                  duration: 8,
                  ease: 'none',
                  modifiers: {
                    yPercent: gsap.utils.wrap(-100, 0),
                  },
                });
              });
            }
          },
        },
      )
      .to(headerRef.current, {
        opacity: 1,
        duration: 1,
        y: '0px',
      });

    // Pin the hero section so projects scroll over it
    ScrollTrigger.create({
      trigger: dashboardConainerRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: false,
      onEnterBack: () => {
        gsap.to(trailRef.current, { display: 'block' });
      },
      onLeave: () => {
        gsap.to(trailRef.current, { display: 'none' });
      },
    });

    return () => {
      if (dashboardConainerRef.current && listenersAttached.current) {
        dashboardConainerRef.current.removeEventListener('mousemove', handleMouseMove);
        dashboardConainerRef.current.removeEventListener('mouseleave', reset);
        listenersAttached.current = false;
      }
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
    };
  }, []);

  return { dashboardConainerRef, imageRef, trailRef, headerRef };
};
