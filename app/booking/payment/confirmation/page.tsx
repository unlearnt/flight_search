// pages/PaymentConfirmationPage.js

import Image from 'next/image';
import { Outfit } from 'next/font/google';
import { HomeIcon } from '@heroicons/react/24/solid';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // Adjust weights as needed
});

export default function PaymentConfirmationPage() {
    return (
        <div
            className={`${outfit.className} min-h-screen bg-neutral-100 flex flex-col items-center py-6`}
        >
            {/* Back Button */}
            <div className="w-full max-w-md flex justify-start px-4 mt-4">
                <button
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow"
                    aria-label="Go to Home"
                >
                    <div className="w-5 h-5">
                        <HomeIcon className="text-blue-950" />
                    </div>
                </button>
            </div>

            {/* Booking Confirmed */}
            <div className="mt-6 text-center">
                <h1 className="text-black text-2xl font-semibold">
                    Booking Confirmed
                </h1>
                <p className="text-black text-sm font-normal mt-2">
                    Booking Reference: A2K3C4
                </p>
            </div>

            {/* Flight Path and Icon */}
            <div className="flex items-center justify-center relative my-6">
                {/* SVG Flight Path */}
                <svg
                    className="w-64 h-24"
                    viewBox="0 0 256 96"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Dashed Flight Path */}
                    <path
                        d="M20 80 C80 10, 176 10, 236 80"
                        stroke="#002991"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                    />
                    {/* Departure Point */}
                    <circle cx="20" cy="80" r="6" fill="#002991" />
                    {/* Arrival Point */}
                    <circle cx="236" cy="80" r="6" fill="#002991" />
                </svg>

                {/* Airplane Icon */}
                <div
                    className="absolute"
                    style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                    <Image
                        src="/booking/payment/confirmation/plane.png"
                        alt="Flight Icon"
                        width={24}
                        height={24}
                    />
                </div>
            </div>

            {/* Flight Information */}
            <div className="w-full max-w-md flex justify-between items-start px-6 mt-2">
                {/* Departure */}
                <div>
          <span className="text-black text-3xl font-semibold tracking-wide">
            SIN
          </span>
                    <br />
                    <span className="text-black text-xs font-semibold tracking-tight">
            Changi Airport
          </span>
                </div>

                {/* Arrival */}
                <div className="text-right">
          <span className="text-black text-3xl font-semibold tracking-wide">
            DPS
          </span>
                    <br />
                    <span className="text-black text-xs font-semibold tracking-tight">
            Ngurah Rai Intl Airport
          </span>
                </div>
            </div>

            {/* Flight Details */}
            <div className="w-full max-w-md flex justify-center space-x-4 mt-6">
                <div className="text-center text-black text-base font-normal">
                    1st Aug
                </div>
                <div className="text-center text-black text-base font-normal">
                    Non stop
                </div>
                <div className="text-center text-black text-base font-normal">
                    2hr 45min
                </div>
            </div>

            {/* Fare Summary */}
            <div className="w-4/5 max-w-md bg-white rounded shadow p-4 mt-8">
                <div className="text-black text-lg font-semibold mb-4">
                    Fare Summary
                </div>

                {/* Base Fare */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="text-black text-sm font-semibold">Base fare</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-black text-sm font-normal">
                            Adult(s) (1 x $70)
                        </div>
                        <div className="text-black text-sm font-normal">$70</div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#c7c7c7] my-4"></div>

                {/* Taxes, Fees, and Surcharges */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <div className="text-black text-sm font-semibold">
                            Taxes, Fee and Surcharges
                        </div>
                        <div className="text-black text-sm font-semibold">$30</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-black text-sm font-normal">
                            Airline Taxes and Surcharges
                        </div>
                        <div className="text-black text-sm font-normal">$20</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-black text-sm font-normal">Service Fee</div>
                        <div className="text-black text-sm font-normal">$10</div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#c7c7c7] my-4"></div>

                {/* Total Amount */}
                <div className="flex justify-between">
                    <div className="text-black text-lg font-semibold">Total Amount</div>
                    <div className="text-black text-lg font-semibold">$100</div>
                </div>
            </div>


            {/* Bottom Spacer */}
            <div className="flex-grow"></div>

            {/* Bottom Bar */}
            <div className="w-full max-w-md flex justify-center items-center py-4">
                <div className="w-32 h-1 bg-black rounded-full"></div>
            </div>
        </div>
    );
}
