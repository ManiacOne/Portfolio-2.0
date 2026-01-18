import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState } from "react"
import { SPEObject } from "@splinetool/react-spline"
import { Application } from "@splinetool/runtime"

export const useProjectsScrollAnimation = () => {
    const projectRootRef = useRef<HTMLDivElement>(null)
    const projectTitleRef = useRef<HTMLHeadingElement>(null)
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
            }
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: projectRootRef.current,
                pin: true,
                // pinSpacing: false,
                start: '30% 30%',
                end: '150% 30%',
                scrub: true,
                onUpdate: (vars) => {
                    moveObj(vars.progress)
                }
            }
        }).fromTo(phoneRef.current,
            { x: -100, opacity: 0 },
            { opacity: 1, x: 0, duration: 2, ease: 'power2.out', }, "a"
        ).fromTo(projectDescriptionRef.current,
            { y: 50 },
            { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, "a"
        ).to(projectDescriptionRef.current,
            { opacity: 0, y: 50, }, "b"
        ).call(() => {
            setCurrentProject(projects[0]);
        },).call(() => {
            setCurrentProject(projects[1]);
        }).fromTo(projectDescriptionRef.current,
            { y: 50 },
            { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, "+=0.5"
        );
    }, []);


    function onLoad(splineApp: Application) {
        const obj = splineApp.findObjectByName('phoneModel');
        if (!obj) return
        splineAppRef.current = obj;
        obj!.rotation.y = Math.PI
    }


    function moveObj(progress: number) {
        if (!splineAppRef.current || !projects.length) return;

        const PI = Math.PI;
        const TWO_PI = 2 * PI;
        const baseRotation = PI; // starts at 180°

        const totalProjects = projects.length;

        // First rotation — 180° to 360° (π → 2π), spans 0.0 → 0.4
        if (progress <= 0.4) {
            const t = progress / 0.4;
            splineAppRef.current.rotation.y = baseRotation + (TWO_PI - baseRotation) * t;
            return;
        }

        // Remaining rotations (360° each)
        const rotationSegment = 0.4;
        const gapSegment = 0.15;
        const startProgress = 0.5;

        for (let i = 1; i < totalProjects; i++) {
            const segmentStart = startProgress + (i - 1) * (rotationSegment + gapSegment);
            const segmentEnd = segmentStart + rotationSegment;

            if (progress >= segmentStart && progress <= segmentEnd) {
                const t = (progress - segmentStart) / rotationSegment;
                const rotation = TWO_PI * i + TWO_PI * t;
                splineAppRef.current.rotation.y = rotation;
                return;
            }

            if (i === totalProjects - 1 && progress > segmentEnd) {
                splineAppRef.current.rotation.y = TWO_PI * totalProjects;
            }
        }
    }




    return { projectRootRef, projectTitleRef, phoneRef, onLoad, projectDescriptionRef, currentProject }
}

interface ProjectI {
    name: string;
    description: string;
}

const projects: ProjectI[] = [
    {
        name: "myPlan8",
        description: "Fighting climate change is not easy. However, according to UNEP if 1 billion out of 8 billion people adopt eco-friendly behaviors in their daily lives, global carbon emissions could reduce by about 20%. We’re here to make it easy!",
    },
    {
        name: "bunkmeal",
        description: "Bunkmeal is a platform that connects students with local restaurants to provide affordable meal options. We aim to make dining out more accessible for students while supporting local businesses.",
    },
    {
        name: "ihNotes",
        description: "Bunkmeal is a platform that connects students with local restaurants to provide affordable meal options. We aim to make dining out more accessible for students while supporting local businesses.",
    }
]

