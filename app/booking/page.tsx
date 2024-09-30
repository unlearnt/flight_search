'use client';

import { useRouter } from 'next/navigation';

export default function FlightBookingComponent() { // Replace with your actual component name
    const router = useRouter();

    return (
        <div className="relative flex flex-col min-h-screen bg-neutral-100 overflow-hidden">
            {/* Background Video */}
            <video
                src="/booking/flight-video.mp4" // Path to your video file
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
                // Optional: Add poster attribute for a fallback image
                // poster="/booking/wing-poster.jpg"
            />

            {/* Content Overlay */}
            <div className="relative z-10 grid grid-rows-1 h-full pb-36 mt-24">

                {/* First Part: Content */}
                <div className="flex flex-col justify-center items-center p-4">
                    {/* Trip Type Buttons */}
                    <div className="flex gap-4">
                        <button className="px-5 py-2.5 bg-white bg-opacity-100 rounded-lg text-black hover:bg-opacity-100 transition">
                            Round Trip
                        </button>
                        <button className="px-5 py-2.5 bg-blue-800 bg-opacity-100 rounded-lg text-white font-bold hover:bg-blue-700 transition shadow-2xl">
                            One Way
                        </button>
                        <button className="px-5 py-2.5 bg-white bg-opacity-100 rounded-lg text-black hover:bg-opacity-90 transition">
                            Multi City
                        </button>
                    </div>
                </div>

                {/* Second Part: Additional Content */}
                <div className="flex flex-col items-start justify-center px-6">
                    {/* Locations */}
                    <div className="bg-white bg-opacity-80 rounded-xl shadow p-4 w-full">
                        <div className="mb-4">
                            <div className="text-gray-500 text-lg">From</div>
                            <div className="text-3xl text-black font-semibold">Singapore</div>
                        </div>
                        <div className="mb-6">
                            <div className="text-gray-500 text-lg">To</div>
                            <div className="text-3xl text-black font-semibold">Bali</div>
                        </div>
                    </div>

                    {/* Date and Passenger Cards */}
                    <div className="flex justify-around w-full mt-4">
                        {/* Date Card */}
                        <div className="bg-white bg-opacity-80 rounded-xl shadow p-4 w-1/2 mr-2">
                            <div className="text-gray-700 text-sm">Date</div>
                            <div className="text-black text-lg font-medium mt-2">1 Aug 2024</div>
                        </div>
                        {/* Passenger Card */}
                        <div className="bg-white bg-opacity-80 rounded-xl shadow p-4 w-1/2 ml-2">
                            <div className="text-gray-700 text-sm">Passenger</div>
                            <div className="text-black text-lg font-medium mt-2">1 person</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Search Flight Button */}
            <div className="fixed bottom-16 left-0 w-full flex justify-center p-4">
                <button
                    onClick={() => {
                        router.push("/booking/confirmation");
                    }}
                    className="w-3/4 h-12 bg-blue-800 rounded-full text-white text-xl font-bold hover:bg-blue-700 transition"
                >
                    Search Flight
                </button>
            </div>
        </div>
    );
}
