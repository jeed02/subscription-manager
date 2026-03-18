import Widget from "../Widget.tsx";

const UpcomingTransactionsWidget = () => {
    const subs =  [
        { name: "Netflix", cost: "$15", logo: "https://www.google.com/s2/favicons?domain=netflix.com&sz=128", frequency: "Monthly" },
        { name: "Spotify", cost: "$10", logo: "https://www.google.com/s2/favicons?domain=spotify.com&sz=128", frequency: "Monthly" },
        { name: "Amazon", cost: "$10", logo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128", frequency: "Monthly" },

    ];
    return (
        <Widget title="Upcoming">
            <ul className="space-y-6">
                {subs.map((sub) => (
                    <li key={sub.name} className="flex flex-row justify-between content-center w-full">
                        <div className="flex flex-row gap-3">
                            <img src={sub.logo} alt="logo" width={40} height={40} />
                            <div className="flex flex-col">
                                <span className="text-md">{sub.name}</span>
                                <span className="text-sm text-gray-400">{sub.frequency}</span>
                            </div>
                        </div>

                        <span className="text-lg text-main-500">{sub.cost}</span>
                    </li>
                ))}
            </ul>
        </Widget>
    )
}
export default UpcomingTransactionsWidget
