'use client';

import {useRouter} from 'next/navigation';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';
import {useEffect, useState} from 'react';

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function PaymentForm() {
    const router = useRouter();
    const [fastlaneComponents, setFastlaneComponents] = useState(null);
    const [email, setEmail] = useState("");
    const [loadPaymentForm, setLoadPaymentForm] = useState(false);
    const [paymentComponent, setPaymentComponent] = useState(null);

    // Loading fastlane component
    useEffect(() => {
        async function loadFastlane() {
            if (typeof window !== 'undefined' && window.paypal) {
                const {
                    identity,
                    profile,
                    FastlanePaymentComponent,
                    FastlaneWatermarkComponent,
                } = await window.paypal.Fastlane({});

                setFastlaneComponents({
                    identity,
                    profile,
                    FastlanePaymentComponent,
                    FastlaneWatermarkComponent,
                });
            }
        }

        void loadFastlane();
    }, []);

    // Rendering fastlane watermark
    useEffect(() => {
        async function renderWatermark() {
            if (fastlaneComponents && fastlaneComponents.FastlaneWatermarkComponent) {
                const fastlaneWatermark = await fastlaneComponents.FastlaneWatermarkComponent({
                    includeAdditionalInfo: true
                });

                fastlaneWatermark.render("#watermark");
            }
        }

        void renderWatermark();
    }, [fastlaneComponents]);

    // Check if user is a fastlane member
    useEffect(() => {
        console.log("email change")
        setLoadPaymentForm(false);
        console.log("Checking Fastlane Member");

        // Email regex pattern
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,6}$/;

        // Check if email is valid
        if (!emailRegex.test(email)) {
            console.log("Invalid email format");
            return;
        }

        async function checkFastlaneMember() {
            console.log("checking Fastlane Member")
            if (fastlaneComponents && fastlaneComponents.identity && emailRegex.test(email)) {
                const {
                    customerContextId
                } = await fastlaneComponents.identity.lookupCustomerByEmail(email);

                console.log("Customer Context Id", customerContextId)

                if (customerContextId) {
                    const authResponse =
                        await fastlaneComponents.identity.triggerAuthenticationFlow(
                            customerContextId
                        );
                    console.log("Auth response:", authResponse);
                }

                console.log("set loaded form")
                setLoadPaymentForm(true);
            }
        }

        void checkFastlaneMember()

    }, [fastlaneComponents, email]);

    // Render fastlane payment form and button
    useEffect(() => {
        // const shippingAddress = {
        //     firstName: "Jen",
        //     lastName: "Smith",
        //     company: "Braintree",
        //     streetAddress: "1 E 1st St",
        //     extendedAddress: "5th Floor",
        //     locality: "Bartlett",
        //     region: "IL", // must be sent in 2-letter format
        //     postalCode: "60103",
        //     countryCodeAlpha2: "US",
        //     phoneNumber: "14155551212"
        // }
        //
        // const options = {
        //     fields: {
        //         phoneNumber: {
        //             // Example of how to prefill the phone number field in the FastlanePaymentComponent
        //             prefill: "4026607986"
        //         }
        //     },
        //     styles: {
        //         root: {   //specify styles here
        //             backgroundColorPrimary: "#ffffff"
        //         }
        //     }
        // };

        async function loadFastlanePaymentForm() {
            if (fastlaneComponents && fastlaneComponents.FastlanePaymentComponent) {
                const fastlanePaymentComponent = await fastlaneComponents.FastlanePaymentComponent({
                    // options,
                    // shippingAddress
                });
                console.log("fastlanePaymentComponent ", fastlanePaymentComponent)
                setPaymentComponent(fastlanePaymentComponent);
                const paymentContainer = document.getElementById("payment-container");
                if (paymentContainer) {
                    await fastlanePaymentComponent.render("#payment-container");
                }
            }
        }

        if (fastlaneComponents && loadPaymentForm) {
            console.log("load fastlane payment form")
            void loadFastlanePaymentForm()
        }

    }, [fastlaneComponents, loadPaymentForm])


    const onClickButton = async () => {

        const token = await paymentComponent.getPaymentToken()
        console.log("creating order ", token)

        let requestBody = {
            amount: 200, // Assuming 'amount' is defined in your context
            paymentToken: token
        };

        try {
            const response = await fetch('/api/paypal/create_order', {
                method: 'POST',  // It's common to use uppercase for HTTP methods
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const apiResponse = await response.json()
            if (apiResponse.status == "COMPLETED") {
                console.log("hello")
            }

        } catch (error) {
            console.error('Error creating agreement token:', error);  // More detailed error logging
        }

    }


    if (!fastlaneComponents) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center">
                    {/*/!* Optional Logo *!/*/}
                    {/*<img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-24 h-24" />*/}

                    {/* Loading Spinner */}
                    <svg
                        className="animate-spin h-10 w-10 text-blue-800 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-label="Loading"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>

                    {/* Loading Text */}
                    <p className="text-lg font-medium text-gray-700">
                        Loading Fastlane components...
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="flex flex-col h-screen bg-neutral-100">
            {/* Scrollable Content Area */}
            <div className="flex flex-col flex-1 overflow-y-auto px-4 mb-36">
                {/* Header */}
                <div className="flex items-center p-4">
                    <button onClick={() => router.back()}>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <ArrowLeftIcon className="w-6 h-6 text-gray-700"/>
                        </div>
                    </button>
                    <h1 className="text-lg font-medium ml-2">Back To Passenger Details</h1>
                </div>

                {/* Form */}
                <form className="space-y-6 px-4 mt-4">
                    {/* Email Field */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-base font-normal text-black">
                            Contact Info
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 bg-white rounded border border-gray-300 text-base text-gray-700"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </form>
                <div className="px-5" id="watermark"></div>


                {/* Payment Container */}
                <div id="payment-container" className="flex-1 px-4 mt-4 overflow-y-auto"></div>

                {/* Proceed to Payment Button */}
                <div className="fixed bottom-16 left-0 w-full flex justify-center p-4">
                    <button onClick={(event) => {
                        event.preventDefault()
                        void onClickButton()
                    }} className="w-3/4 h-12 bg-blue-800 rounded-full text-white text-xl font-bold">
                        Proceed to Payment
                    </button>
                </div>
            </div>

        </div>
    );
}
