import { useEffect, useState } from "react";

export default function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/restaurants")
            .then(res => res.json())
            .then(data => setRestaurants(data));
    }, []);

    const addRestaurant = async () => {
        if (!name || !location) return;

        await fetch("http://localhost:8080/restaurants", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, location }),
        });

        setName("");
        setLocation("");
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">

            {/* Main Card */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-4xl text-white shadow-2xl border border-slate-700">

                {/* Header */}
                <h1 className="text-4xl font-extrabold text-center mb-2">
                    🍽 Restaurant Hub
                </h1>
                <p className="text-center text-slate-400 mb-8">
                    Simple restaurant management dashboard
                </p>

                {/* Add Restaurant */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <input
                        className="flex-1 p-4 rounded-xl bg-slate-700 outline-none placeholder-slate-400 focus:ring-2 focus:ring-orange-500"
                        placeholder="Restaurant Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        className="flex-1 p-4 rounded-xl bg-slate-700 outline-none placeholder-slate-400 focus:ring-2 focus:ring-orange-500"
                        placeholder="Location"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                    <button
                        onClick={addRestaurant}
                        className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold transition shadow-md"
                    >
                        Add
                    </button>
                </div>

                {/* Restaurant List */}
                {restaurants.length === 0 ? (
                    <p className="text-center text-slate-400">
                        No restaurants added yet
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {restaurants.map(r => (
                            <div
                                key={r.id}
                                className="bg-slate-700 rounded-2xl p-5 hover:bg-slate-600 transition shadow"
                            >
                                <h3 className="text-xl font-semibold mb-1">
                                    {r.name}
                                </h3>
                                <p className="text-sm text-slate-300">
                                    📍 {r.location}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <p className="text-center text-xs text-slate-500 mt-10">
                    React + Spring Boot • JWT Secured
                </p>
            </div>
        </div>
    );
}
