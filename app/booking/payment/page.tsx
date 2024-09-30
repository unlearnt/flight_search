// app/payment/page.js
import Script from 'next/script'
import { headers } from 'next/headers';
import PaymentForm from './PaymentForm';

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const headersList = headers();
const baseURL = `${headersList.get('x-forwarded-proto') || 'http'}://${headersList.get('host')}`;


async function getPayPalToken() {
    const response = await fetch(`${baseURL}/api/paypal/get_token`, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('Failed to fetch PayPal token');
    }
    return response.json();
}

export default async function PaymentPage() {
    // Fetch the PayPal token server-side
    const sdkClientToken = await getPayPalToken();

    return (<div>
        <Script
            src={`https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons,fastlane`}
            // strategy="lazyOnload"
            data-sdk-client-token={sdkClientToken.access_token}
            strategy="beforeInteractive" // Load the script before the page becomes interactive
        />
        <PaymentForm/>
    </div>);
}
