"use client"
import Image from 'next/image';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';
import {useRouter} from 'next/navigation'

export default function Confirmation() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            {/* Header */}
            <div className="flex items-center p-4">
                <button onClick={() => router.back()}>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-700"/>
                    </div>
                </button>
                <h1 className="text-xl font-medium ml-3">Flight Search</h1>
            </div>

            {/* Destination Image */}
            <div className="flex justify-center mt-4">
                <Image
                    src="/booking/confirmation/bali.png" // Replace with your destination image path
                    alt="Destination"
                    width={600}
                    height={400}
                    className="w-full max-w-md h-auto"
                />
            </div>

            {/* Flight Date */}
            <div className="text-center mt-4">
                <div className="text-gray-500 text-sm">Flight Date</div>
                <div className="text-2xl font-bold text-black">1 August 2024</div>
            </div>

            {/* Cards Container */}
            <div className="flex flex-col flex-1 overflow-y-auto px-4 mb-36">
                <div className="flex flex-col items-center mt-6">
                    {/* Flight Card */}
                    <div className="max-w-md w-4/5 p-5 bg-white rounded-xl shadow border border-gray-300 my-5">
                        <div className="flex justify-between">
                            <div>
                                <div className="text-2xl font-medium text-gray-900">17:00</div>
                                <div className="text-xs text-gray-500">Changi Airport</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-medium text-gray-900">19:45</div>
                                <div className="text-xs text-gray-500">Ngurah Rai Intl Airport</div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex items-center my-4">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <div className="flex-shrink-0 mx-2 text-xs font-bold text-gray-700">2:45H</div>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Flight Details */}
                        <div className="flex justify-between text-xs text-gray-500">
                            <div>PP252 | Economy</div>
                            <div>Total Price: $100</div>
                        </div>
                        <div className="mt-4">
                            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                                <li>1 piece x 8 kg cabin baggage</li>
                                <li>In-flight snacks</li>
                                <li>Standard seat selection</li>
                            </ul>
                        </div>
                    </div>

                    {/* Additional Flight Cards (if any) */}
                </div>
            </div>

            {/* Continue Button */}
            <div className="fixed bottom-16 left-0 w-full flex justify-center p-4">
                {/*<button className="w-3/4 max-w-sm px-8 py-3 bg-blue-800 text-white text-xl font-bold rounded-full">*/}
                {/*    Continue*/}
                {/*</button>*/}
                <button onClick={() => router.push("./details")}
                        className="w-3/4 h-12 bg-blue-800 rounded-full text-white text-xl font-bold">
                    Continue
                </button>
            </div>

        </div>
    );
}
