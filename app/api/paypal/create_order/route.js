import {NextResponse} from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic'

const auth = Buffer.from(process.env.PAYPAL_CLIENT_ID + ':' + process.env.PAYPAL_CLIENT_SECRET).toString('base64');

export async function POST(request) {

    console.log("Creating order ")

    const requestData = await request.json();

    let {amount, paymentToken} = requestData;
    console.log("/createOrder called ", paymentToken)

    try {

        const uuid = crypto.randomUUID();

        // get access token
        const accessToken = await getAccessToken()
        if (!accessToken) throw new Error('Merchant access token was not met');

        // Create the order with PayPal
        const orderResponse = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'PayPal-Request-Id': uuid,
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        invoice_id: uuid,
                        amount: {
                            currency_code: 'USD',
                            value: amount,
                        },
                    },
                ],
                payment_source: {
                    card: {
                        single_use_token: paymentToken.id,
                    },
                },
            }),
        });

        const orderData = await orderResponse.json();

        console.log("create order response ", JSON.stringify(orderData))

        return NextResponse.json(orderData);
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        return new Response(`Failed to create PayPal order: ${error}`, {status: 500});
    }
}

const getAccessToken = async () => {

    try {
        console.log("getting AccessToken ")
        // Fetch the access token from PayPal
        const authResponse = await fetch(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${auth}`
            },
            body: `grant_type=client_credentials&response_type=id_token`,
        });

        // Check if the response is ok
        if (!authResponse.ok) {
            throw new Error(`HTTP error ${authResponse.status}`);
        }

        const authData = await authResponse.json();

        console.log("authData response ", authData);
        return authData.access_token;
    } catch (error) {
        // Handle the error
        console.error('Error fetching access token:', error);
        // You can throw the error or return a default value
        // throw error;
        return null;
    }
}
