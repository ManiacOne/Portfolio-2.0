import { useEffect, useState } from "react";
import "./styles/customCursor.scss";

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            setTimeout(() => {
                setPosition({ x: e.clientX, y: e.clientY });
            }, 100);
        };

        const mouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, .hover-target")) {
                setIsHovering(true);
            }
        };

        const mouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, .hover-target")) {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", mouseOver);
        window.addEventListener("mouseout", mouseOut);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", mouseOver);
            window.removeEventListener("mouseout", mouseOut);
        };
    }, []);

    return (
        <div
            className={`custom_cursor ${isHovering ? "hovering" : ""}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        />
    );
};

export default CustomCursor;