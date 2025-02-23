import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const stripePromise = loadStripe("your_stripe_publishable_key");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [qrCode, setQrCode] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to make a payment.");
            return;
        }

        const { data } = await axios.post("http://localhost:3000/create-payment-intent", {
            amount: 5000,
            currency: "usd",
        }, { headers: { Authorization: `Bearer ${token}` } });

        const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.paymentIntent) {
            setQrCode(`Payment ID: ${result.paymentIntent.id}`);
        } else {
            alert("Payment failed!");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>Pay</button>
            </form>
            {qrCode && <QRCodeCanvas value={qrCode} />}
        </div>
    );
};

const PaymentPage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default PaymentPage;
