import { NavLink } from "react-router-dom";
import subManager1 from "../assets/subManager1.png";
import subManager3 from "../assets/subManager3.png";

import Magnetic from "../components/homepage/Magnetic";

const HomePage = () => {
    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden bg-white">
            {/* Top-left image */}
            <Magnetic>
                <img
                    src={subManager3}
                    alt=""
                    className="absolute top-64 left-64 w-128 h-auto rounded-2xl blur-2xs pointer-events-auto border border-main-300 border-1"
                />
            </Magnetic>

            {/* Bottom-right image */}
            <Magnetic>
                <img
                    src={subManager1}
                    alt=""
                    className="absolute bottom-10 right-20 w-164 h-auto rounded-2xl blur-2xs pointer-events-auto border border-main-300 border-1"
                />
            </Magnetic>

            {/* Top-right image */}
            <Magnetic>
                <img
                    src={subManager1}
                    alt=""
                    className="absolute top-24 right-100 w-72 h-auto rounded-2xl blur-2xs pointer-events-auto border border-main-300 border-1"
                />
            </Magnetic>

            <div className="flex flex-col items-center">
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
