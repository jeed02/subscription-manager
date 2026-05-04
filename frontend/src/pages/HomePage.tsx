import gsap from "gsap";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import subManager1 from "../assets/subManager1.png";
import subManager3 from "../assets/subManager3.png";

import Magnetic from "../components/homepage/Magnetic";

const HomePage = () => {
    const centerRef = useRef<HTMLDivElement>(null);
    const img1Ref = useRef<HTMLDivElement>(null);
    const img2Ref = useRef<HTMLDivElement>(null);
    const img3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(centerRef.current, { y: 60, opacity: 0 });
            gsap.set([img1Ref.current, img2Ref.current, img3Ref.current], {
                scale: 0,
                opacity: 0,
            });

            gsap.to(centerRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
            });

            gsap.to([img1Ref.current, img2Ref.current, img3Ref.current], {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: 1,
                stagger: 0.15,
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden bg-white">
            {/* Top-left image */}
            <div ref={img1Ref} className="absolute top-64 left-64">
                <Magnetic>
                    <img
                        src={subManager3}
                        alt=""
                        className="w-128 h-auto rounded-2xl blur-2xs pointer-events-auto border border-main-300 border-1"
                    />
                </Magnetic>
            </div>

            {/* Bottom-right image */}
            <div ref={img2Ref} className="absolute bottom-10 right-20">
                <Magnetic>
                    <img
                        src={subManager1}
                        alt=""
                        className="w-164 h-auto rounded-2xl blur-2xs pointer-events-auto border border-main-300 border-1"
                    />
                </Magnetic>
            </div>

            {/* Top-right image */}
            <div ref={img3Ref} className="absolute top-24 right-100">
                <Magnetic>
                    <img
                        src={subManager1}
                        alt=""
                        className="w-72 h-auto rounded-2xl blur-2xs pointer-events-auto border border-main-300 border-1"
                    />
                </Magnetic>
            </div>

            <div ref={centerRef} className="flex flex-col items-center">
                <h1 className="relative z-10 text-8xl font-bold text-center leading-none select-none font-bell">
                    SubManager
                </h1>
                <p className="relative z-10 mt-4 text-2xl text-center text-gray-600 select-none">
                    Take control of your subscriptions
                </p>
                <div className="mt-6 gap-4 flex z-10">
                    <NavLink
                        to="/register"
                        className="z-10 text-lg font-medium text-main-300 border border-main-300 px-6 py-3 rounded-full hover:bg-main-300 hover:text-white transition-colors w-48 text-center bg-white"
                    >
                        Get Started
                    </NavLink>

                    <NavLink
                        to="/login"
                        className="z-10 text-lg font-medium text-main-300 border border-main-300 px-6 py-3 rounded-full hover:bg-main-300 hover:text-white transition-colors w-48 text-center bg-white"
                    >
                        Log In
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
