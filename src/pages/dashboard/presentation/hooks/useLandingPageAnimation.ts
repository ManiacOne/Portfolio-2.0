import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useRef } from "react";

export const useLandingPageAimation = () => {

    const dashboardConainerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const dashboardTitleRef = useRef<HTMLHeadingElement>(null);
    const characterRef = useRef<HTMLDivElement>(null);
    const backgroundContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        // Animation for appearing the header and dashboard title
        gsap.timeline()
            .set([dashboardTitleRef.current], { opacity: 0 })
            .set([headerRef.current], { opacity: 0 })
            .to([dashboardTitleRef.current], {
                opacity: 1,
                duration: 0.3,
                ease: "power2.in",
                delay: 2.2,
            }, "a")
            .to(headerRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.in",
                delay: 2.2,
            }, "a")
            .to(dashboardTitleRef.current, {
                xPercent: -42.05,
                ease: "none",
                duration: 5,
                repeat: -1,
            });

        // Animation for the dashboard container to push it down while scrolling
        gsap.timeline({
            scrollTrigger: {
                trigger: dashboardConainerRef.current,
                start: "0% 0%",
                end: "100% 0%",
                scrub: true,
            }
        }).to(dashboardConainerRef.current, {
            y: 420,
            duration: 5,
        });

        // Animation for the character to scale down and fade out while scrolling
        gsap.timeline({
            scrollTrigger: {
                trigger: dashboardConainerRef.current,
                start: "20% 10%",
                end: "90% 15%",
                scrub: true,
            },
        }).to(characterRef.current, {
            opacity: 0,
            scale: 0.5,
            ease: "power3.inOut",
        }, "a").to(backgroundContainerRef.current, {
            scale: 15,
        }, "a");




    }, []);

    return { dashboardTitleRef, dashboardConainerRef, headerRef, characterRef, backgroundContainerRef };
}