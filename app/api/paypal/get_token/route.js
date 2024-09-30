import { NextResponse } from 'next/server';

export async function GET() {
    const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('response_type', 'client_token');
    params.append('intent', 'sdk_init');
    // params.append('domains[]', 'paypal.com');


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(process.env.PAYPAL_CLIENT_ID + ':' + process.env.PAYPAL_CLIENT_SECRET).toString('base64'),
            },
            body: params,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();



        // Only return necessary data to the client
        return NextResponse.json({
            access_token: data.access_token,
            expires_in: data.expires_in
        });
    } catch (error) {
        console.error('Error fetching PayPal token:', error);
        return NextResponse.json({ error: 'Failed to fetch PayPal token' }, { status: 500 });
    }
}