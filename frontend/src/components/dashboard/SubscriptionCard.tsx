import { IoChevronForwardSharp } from "react-icons/io5";

export default function SubscriptionCard({
    name,
    daysLeft,
    cost,
    logo,
}: {
    name: string;
    daysLeft: number;
    cost: number;
    logo: string;
}) {
    return (
        <div className="flex flex-col gap-3 bg-main-10 rounded-xl shadow-sm border border-main-400 p-4 lg:px-6 lg:py-5 ">
            <div className="flex flex-row items-center justify-between h-3/4">
                <div className="flex flex-row items-center justify-between lg:gap-4 md:gap-1">
                    <img
                        src={logo}
                        alt="logo"
                        className="lg:h-9 lg:w-9 md:h-5 md:w-5"
                    />
                    <h1 className="lg:text-xl md:text-lg">{name}</h1>
                </div>

                <button onClick={() => {}} className="cursor-pointer">
                    <IoChevronForwardSharp className="lg:text-2xl text-main-800 md:text-lg" />
                </button>
            </div>

            <div className="flex flex-row items-center justify-between gap-2 h-1/4 text-main-900">
                <div className="rounded-4xl bg-main-100 p-2 text-center md:text-sm">
                    {daysLeft} days left
                </div>

                <div className="rounded-4xl bg-main-100 p-2 text-center md:text-sm">
                    ${cost}
                </div>
            </div>
        </div>
    );
}
