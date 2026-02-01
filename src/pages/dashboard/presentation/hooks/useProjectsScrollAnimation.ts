import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { SPEObject } from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';

const TIMING = {
  phoneEntrance: 1, // Phone slides in
  descriptionEntrance: 1, // First description appears
  descriptionVisible: 2, // How long description stays at y:0 (PAUSE)
  descriptionExit: 1.5, // Description slides out (increased for slower scroll)
  descriptionEnter: 1.5, // New description slides in (increased for slower scroll)
};

export const useProjectsScrollAnimation = () => {
  const projectRootRef = useRef<HTMLDivElement>(null);
  const projectTitleRef = useRef<HTMLHeadingElement>(null);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const projectDescriptionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<SPEObject>();

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: projectRootRef.current,
        start: 'top 80%',
        end: 'bottom 60%',
        toggleActions: 'play none none reverse',
      },
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: projectRootRef.current,
        pin: true,
        start: '30% 30%',
        end: `+=${100 * (projects.length - 1)}%`,
        scrub: true,
        onUpdate: (vars) => {
          moveObj(vars.progress);
        },
      },
    });

    // Animation for phone and description entrance
    timeline
      .fromTo(
        phoneRef.current,
        { x: 100, opacity: 0 },
        { opacity: 1, x: 0, ease: 'power2.out', duration: TIMING.phoneEntrance },
      )
      .fromTo(
        projectDescriptionRef.current,
        { y: 80, opacity: 0 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: TIMING.descriptionEntrance },
      )
      // Pause while first project is visible (description at y:0)
      .to(projectDescriptionRef.current, { duration: TIMING.descriptionVisible });

    // Animation for cycling through projects
    for (let i = 0; i < projects.length - 1; i++) {
      timeline
        // Exit current description
        .to(projectDescriptionRef.current, {
          y: 60,
          opacity: 0,
          ease: 'power2.in',
          duration: TIMING.descriptionExit,
        })
        // Switch project data
        .call(() => setCurrentProject(projects[i]))
        .call(() => {
          setCurrentProject(projects[i + 1]);
        })
        // Enter new description
        .fromTo(
          projectDescriptionRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: TIMING.descriptionEnter,
          },
        )
        // Pause while project is visible (description at y:0)
        .to(projectDescriptionRef.current, { duration: TIMING.descriptionVisible });
    }
  }, []);

  function onLoad(splineApp: Application) {
    const obj = splineApp.findObjectByName('phoneModel');
    if (!obj) return;
    splineAppRef.current = obj;
    obj!.rotation.y = Math.PI;

    const imageObj = splineApp.findObjectByName('Screen');
    console.log('imageObj', imageObj);
    console.log(Object.keys(imageObj!));
  }

  /**
   * SPLINE ROTATION MATH EXPLAINED
   * ==============================
   *
   * GOAL:
   *   - The phone (spline) rotates as you scroll, matching the project transitions.
   *   - When a project description is visible (y:0), the phone pauses, facing front.
   *   - The scroll progress (0 → 1) is mapped to a timeline of animations (entrance, rotation, pause).
   *
   * HOW THE TIMING WORKS:
   *   - The GSAP timeline and the rotation math use the same TIMING config (see top of file).
   *   - Each animation (entrance, exit, pause) has a duration in "timeline units".
   *   - With scrub:true, these durations are proportional to scroll progress.
   *   - The total timeline duration is:
   *       entrance (phone + first description)
   *     + first pause (first project visible)
   *     + (exit + enter + pause) × (number of transitions)
   *   - Example for 3 projects:
   *       phoneEntrance + descriptionEntrance + descriptionVisible
   *     + (descriptionExit + descriptionEnter + descriptionVisible) × 2
   *
   * HOW ROTATION IS MAPPED:
   *   - The phone starts at π radians (back facing).
   *   - During the entrance phase, it rotates from π → 2π (front facing, first project).
   *   - During each transition (exit + enter), it rotates a full turn (2π) for each new project.
   *   - During each pause (descriptionVisible), the phone holds at the front (even multiple of 2π).
   *   - The math ensures the phone always ends facing front after the last project.
   *
   * WHY THIS WORKS:
   *   - The scroll progress is converted to a timeline position (timelinePosition = progress × totalDuration):
   *       • We multiply (not add) because progress is a normalized value (0 to 1), and we want to scale it up to the real timeline length.
   *       • Example: If totalDuration is 10, progress 0.5 means halfway through the scroll,
   *         so timelinePosition = 0.5 × 10 = 5 (halfway through the animation timeline).
   *       • If we added, the units would not make sense (0.5 + 10 = 10.5), and the mapping would not be proportional.
   *       • Scroll progress (0 to 1) is a normalized value representing how far the user has scrolled through the animation.
   *       • totalDuration is the sum of all animation segment durations (entrance, transitions, pauses) in the GSAP timeline.
   *       • timelinePosition is the actual "virtual time" along the animation timeline, measured in the same units as the GSAP durations.
   *
   *   WHY NOT USE PROGRESS DIRECTLY?
   *       • Each animation segment (entrance, exit, pause, etc.) can have a different duration
   *         (for example, a pause might be 4 units, a rotation 3 units, etc.).
   *       • If you used progress directly, the scroll would be split evenly between all segments, regardless of their intended duration.
   *         For example, with 2 segments (pause=4, rotation=3), progress 0-0.5 would be pause, 0.5-1 would be rotation,
   *         so both get 50% of the scroll, even though pause is longer.
   *
   *       • ASCII VISUALIZATION:
   *         Suppose you have:
   *           - Pause: 4 units
   *           - Rotation: 3 units
   *           - totalDuration = 7 units
   *
   *         Using timelinePosition (correct):
   *           0      4         7
   *           |------|---------|
   *           |pause |rotation |
   *           |------|---------|
   *           0%    57%      100% scroll
   *         So pause takes 4/7 ≈ 57% of the scroll, rotation takes 3/7 ≈ 43%.
   *
   *         Using progress directly (incorrect):
   *           0     0.5      1.0
   *           |-----|-------|
   *           |pause|rotation|
   *           |-----|-------|
   *           0%   50%    100% scroll
   *         Both segments get 50% of the scroll, even though pause is longer.
   *
   *       • By converting progress to timelinePosition, each segment's scroll space is proportional to its duration,
   *         so the animation feels natural and matches the intended pacing.
   *       • This approach is essential for complex, multi-segment scroll-driven animations, and is a standard technique in advanced UI animation.
   *   - For each segment (entrance, pause, transition, pause...), the code checks where the scroll is:
   *       - If in a rotation segment, interpolate the rotation angle.
   *       - If in a pause segment, hold the rotation angle.
   *   - This keeps the phone and project description perfectly in sync, regardless of project count or timing config.
   *
   * FORMULAS (and why they work):
   *
   *   - First rotation: π + π × t, where t = (timelinePosition / entranceDuration)
   *     • The phone starts at π radians (180°, back facing). As you scroll through the entrance phase,
   *       t goes from 0 to 1, so the rotation goes from π to 2π (360°, front facing).
   *       This matches the phone "turning around" as the first project appears.
   *
   *   - Subsequent rotations: 2π × i + 2π × t, where t = (timelinePosition - cycleStart) / transitionDuration
   *     • For each project switch (i = 1, 2, ...), the phone starts at 2π × i (an integer multiple of 360°, always front facing)
   *       and rotates a full turn (2π radians) as t goes from 0 to 1. This means every project switch is a smooth, complete spin,
   *       always ending front facing.
   *
   *   - Pause: 2π × (i+1)
   *     • During the pause (when the project description is visible at y:0), the phone holds at an even multiple of 2π,
   *       which is always front facing. This ensures the phone is never sideways or backwards when a project is being shown.
   *
   * WHERE THIS COMES FROM:
   *   - These formulas are derived from basic circle geometry (radians: 2π = 360°).
   *   - The idea is to always rotate in full turns (2π) so the phone is never upside down or backwards when a project is visible.
   *   - The formulas are mapped to the scroll-driven timeline, so the animation is always in sync with the scroll and the GSAP timeline.
   *   - This approach is common in carousel/slider animations and 3D UI, where you want a smooth, predictable, and reversible rotation.
   *
   * VISUAL TIMELINE (for 3 projects):
   *   ┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
   *   │ Entrance    │ Pause       │ Transition  │ Pause       │ Transition  │ Pause       │
   *   │ (π→2π)      │ (hold 2π)   │ (2π→4π)     │ (hold 4π)   │ (4π→6π)     │ (hold 6π)   │
   *   └─────────────┴─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
   *   (Each transition = exit + enter, each pause = descriptionVisible)
   */
  function moveObj(progress: number) {
    if (!splineAppRef.current || !projects.length) return;

    const PI = Math.PI;
    const TWO_PI = 2 * PI;
    const baseRotation = PI; // starts at 180°

    const totalProjects = projects.length;

    // Use the same timing as GSAP timeline for perfect sync
    const entranceDuration = TIMING.phoneEntrance + TIMING.descriptionEntrance;
    const firstPauseDuration = TIMING.descriptionVisible;
    const transitionDuration = TIMING.descriptionExit + TIMING.descriptionEnter;
    const subsequentPauseDuration = TIMING.descriptionVisible;

    // Total timeline duration (matches GSAP timeline)
    const totalDuration =
      entranceDuration +
      firstPauseDuration +
      (transitionDuration + subsequentPauseDuration) * (totalProjects - 1);

    // Convert progress (0-1) to timeline position
    const timelinePosition = progress * totalDuration;

    // Phase 1: First rotation during entrance (phone + description slide in)
    // Rotation: π → 2π
    if (timelinePosition <= entranceDuration) {
      const t = timelinePosition / entranceDuration;
      splineAppRef.current.rotation.y = baseRotation + PI * t; // π → 2π
      return;
    }

    // Phase 2: First pause (description at y:0, Project 1 visible)
    const firstPauseEnd = entranceDuration + firstPauseDuration;
    if (timelinePosition <= firstPauseEnd) {
      splineAppRef.current.rotation.y = TWO_PI; // Hold at 2π (front-facing)
      return;
    }

    // Phase 3+: Subsequent rotations and pauses
    for (let i = 1; i < totalProjects; i++) {
      const cycleStart = firstPauseEnd + (i - 1) * (transitionDuration + subsequentPauseDuration);
      const rotationEnd = cycleStart + transitionDuration;
      const pauseEnd = rotationEnd + subsequentPauseDuration;

      // Rotation phase: during descExit + descEnter (description animating out then in)
      if (timelinePosition >= cycleStart && timelinePosition <= rotationEnd) {
        const t = (timelinePosition - cycleStart) / transitionDuration;
        splineAppRef.current.rotation.y = TWO_PI * i + TWO_PI * t; // 2πi → 2π(i+1)
        return;
      }

      // Pause phase: during descVisible (description at y:0)
      if (timelinePosition >= rotationEnd && timelinePosition <= pauseEnd) {
        splineAppRef.current.rotation.y = TWO_PI * (i + 1); // Hold at 2π(i+1)
        return;
      }
    }

    // End state: ensure facing front
    splineAppRef.current.rotation.y = TWO_PI * totalProjects;
  }

  return {
    projectRootRef,
    projectTitleRef,
    phoneRef,
    onLoad,
    projectDescriptionRef,
    currentProject,
  };
};

interface ProjectI {
  id: number;
  name: string;
  description: string;
}

const projects: ProjectI[] = [
  {
    id: 0,
    name: 'Project One',
    description:
      'This is a dummy project description for testing purposes. It provides comprehensive details about the first project in our portfolio showcase. The project leverages modern web technologies such as React, TypeScript, and GSAP to deliver a seamless user experience. Key features include responsive layouts, interactive animations, and accessibility enhancements. The development process involved iterative prototyping, user feedback sessions, and performance optimizations to ensure the final product meets high standards of usability and visual appeal. This project serves as a foundational example for implementing advanced scroll-driven animations in a real-world application.',
  },
  {
    id: 1,
    name: 'Project Two',
    description:
      'Another dummy project to fill the carousel with sample data. This project demonstrates advanced animation techniques and smooth scrolling interactions. It integrates 3D models using Spline, allowing users to interact with objects in real time. The animation timeline is meticulously crafted to synchronize transitions between project descriptions and 3D object rotations, creating a cohesive and engaging narrative. Extensive testing was conducted to guarantee compatibility across devices and browsers. The project also features modular code architecture, making it easy to extend and maintain as new features are introduced.',
  },
  {
    id: 2,
    name: 'Project Three',
    description:
      'A third dummy project for scroll animation testing. It showcases how different projects can be cycled through with elegant transitions and visual effects. The implementation focuses on delivering a fluid user journey, utilizing GSAP timelines and custom hooks to manage state and animation logic. Special attention was given to accessibility, ensuring keyboard navigation and screen reader support. The project includes comprehensive documentation and code comments, making it an excellent reference for developers looking to implement similar scroll-based animations in their own projects.',
  },
  {
    id: 3,
    name: 'Project Four',
    description:
      'The fourth dummy project in our series. This project highlights the use of 3D models and interactive elements to create an engaging user experience. It features a robust integration with Spline for rendering complex 3D scenes, coupled with finely tuned GSAP animations for smooth transitions. The project emphasizes scalability and maintainability, with reusable components and clear separation of concerns. User feedback was instrumental in refining the interface, resulting in a polished and intuitive design. This project exemplifies best practices in modern frontend development, combining creativity with technical excellence.',
  },
];
