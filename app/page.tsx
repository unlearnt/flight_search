'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import Script from 'next/script';

// Assume we're getting this from an environment variable
// const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function Home() {
    const router = useRouter();
    // const [sdkClientToken, setSdkClientToken] = useState(null);

    // useEffect(() => {
    //     async function getPayPalToken() {
    //         try {
    //             const response = await fetch('/api/paypal/get_token', { cache: 'no-store' });
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch PayPal token');
    //             }
    //             const data = await response.json();
    //             setSdkClientToken(data.access_token);
    //             console.log('sdkClientToken', data.access_token);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //
    //     getPayPalToken();
    // }, []);

    return (
        <div className="relative h-screen bg-neutral-100 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/homepage/bg.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Wrapper Positioned at Bottom */}
            <div className="absolute bottom-8 w-full">
                {/* Main Content */}
                <div className="flex flex-col items-center px-8 pb-8">
                    <h1 className="text-center text-white text-2xl md:text-4xl font-normal tracking-wide mb-10">
                        Book your next destination <br /> with us
                    </h1>

                    <div className="space-y-6">
                        <button
                            onClick={() => router.push('/booking')}
                            className="w-full max-w-xs h-12 bg-[#003087] rounded-full text-white text-xl font-bold"
                        >
                            Book Now
                        </button>
                        <button
                            onClick={() => router.push('/checkin')}
                            className="w-full max-w-xs h-12 bg-[#003087] rounded-full text-white text-xl font-bold"
                        >
                            Check-In
                        </button>
                    </div>
                </div>
            </div>

            {/*/!* Load PayPal Script *!/*/}
            {/*{clientId && (*/}
            {/*    <Script*/}
            {/*        src={`https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons`}*/}
            {/*        strategy="afterInteractive"*/}
            {/*        onLoad={() => {*/}
            {/*            console.log('PayPal SDK script loaded successfully.');*/}
            {/*            // Initialize PayPal Buttons or other functionalities here*/}
            {/*        }}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    );
}
