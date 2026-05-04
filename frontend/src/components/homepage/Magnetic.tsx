import gsap from "gsap";
import React, { useEffect, useRef } from "react";

interface MagneticProps {
    children: React.ReactElement;
}

const Magnetic = ({ children }: MagneticProps) => {
    const magneticRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const xTo = gsap.quickTo(magneticRef.current, "x", {
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });
        const yTo = gsap.quickTo(magneticRef.current, "y", {
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });
        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } =
                magneticRef.current!.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x);
            yTo(y);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        magneticRef.current!.addEventListener("mousemove", mouseMove);
        magneticRef.current!.addEventListener("mouseleave", mouseLeave);

        return () => {
            magneticRef.current?.removeEventListener("mousemove", mouseMove);
            magneticRef.current?.removeEventListener("mouseleave", mouseLeave);
        };
    }, []);

    return React.cloneElement(children, { ref: magneticRef });
};

export default Magnetic;
