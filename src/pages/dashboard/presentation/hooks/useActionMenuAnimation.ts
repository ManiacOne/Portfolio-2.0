import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useActionMenuAnimation = () => {
    const actionMenuRef = useRef<HTMLDivElement>(null);
    const actionMenuItemsRef = useRef<HTMLDivElement[]>([]);

    const setActionMenuItemsRef = (el: HTMLDivElement | null) => {
        if (el && !actionMenuItemsRef.current.includes(el)) {
            actionMenuItemsRef.current.push(el);
        }
    };

    useGSAP(() => {

        gsap.timeline()
            .from(".action_menu_container", {
                opacity: 0,
                duration: 1,
                delay: 1,
                ease: "back.in",
                gap: "50px"
            }, "a")


        actionMenuItemsRef.current.forEach((item, index) => {
            const onEnter = () => {
                const tl = gsap.timeline();

                actionMenuItemsRef.current.forEach((el, i) => {
                    const distance = Math.abs(index - i);

                    let y = 0;
                    let scale = 1;

                    if (i === index) {
                        y = -20;
                        scale = 1.2;
                    } else if (distance === 1) {
                        y = 10;
                    } else if (distance === 2) {
                        y = 20;
                    } else {
                        y = 30;
                    }

                    tl.to(el, {
                        y,
                        scale,
                        duration: 0.4,
                        ease: "power2.out"
                    }, 0);
                });

                tl.to(".action_menu_container", {
                    gap: "10px",
                    duration: 0.2,
                    ease: "power2.out"
                }, 0);
            };

            const onLeave = () => {
                const tl = gsap.timeline();

                actionMenuItemsRef.current.forEach((el, index) => {
                    tl.to(el, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    }, 0);
                });

                tl.to(".action_menu_container", {
                    gap: "0px",
                    duration: 0.2,
                    ease: "power2.out"
                }, 0);
            };

            item.addEventListener("mouseenter", onEnter);
            item.addEventListener("mouseleave", onLeave);

            return () => {
                item.removeEventListener("mouseenter", onEnter);
                item.removeEventListener("mouseleave", onLeave);
            };
        });



    }, [])

    return { actionMenuRef, actionMenuItemsRef, setActionMenuItemsRef };
}