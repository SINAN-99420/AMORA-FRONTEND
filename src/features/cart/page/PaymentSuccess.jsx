import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import client from "../../../lib/ApiClient";
import "../style/PaymentSuccess.css";

const PaymentSuccess = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");

    useEffect(() => {

        const verifyPayment = async () => {

            const sessionId = searchParams.get("session_id");

            if (!sessionId) {

                setMessage("Invalid payment session.");

                setLoading(false);

                return;

            }

            try {

                const response = await client.get(
                    `payment/payment-success/?session_id=${sessionId}`
                );

                setMessage(response.data.message);

                setLoading(false);

                setTimeout(() => {

                    navigate("/myorders");

                }, 3000);

            }

            catch (error) {

                console.log(error.response?.data);

                setMessage(
                    error.response?.data?.message ||
                    "Payment verification failed."
                );

                setLoading(false);

            }

        };

        verifyPayment();

    }, [navigate, searchParams]);

    return (

        <div className="payment-success-page">

            <div className="payment-success-card">

                {
                    loading ?

                        <>

                            <div className="payment-loader">

                                <span></span>

                            </div>

                            <h2 className="payment-title">

                                Verifying Your Payment

                            </h2>

                            <p className="payment-subtitle">

                                We're securely confirming your payment.
                                This usually takes only a few seconds.

                            </p>

                        </>

                        :

                        <>

                            <div className="success-icon">

                                <svg
                                    viewBox="0 0 52 52"
                                    xmlns="http://www.w3.org/2000/svg"
                                >

                                    <circle
                                        className="success-circle"
                                        cx="26"
                                        cy="26"
                                        r="25"
                                        fill="none"
                                    />

                                    <path
                                        className="success-check"
                                        fill="none"
                                        d="M14 27l7 7 17-17"
                                    />

                                </svg>

                            </div>

                            <h2 className="payment-title">

                                Payment Confirmed

                            </h2>

                            <p className="payment-subtitle">

                                Thank you for shopping with us.
                                Your payment has been successfully verified.

                            </p>

                            <div className="payment-message">

                                {message}

                            </div>

                            <div className="payment-info">

                                <div className="info-row">

                                    <span>Status</span>

                                    <strong>Confirmed</strong>

                                </div>

                                <div className="info-row">

                                    <span>Order</span>

                                    <strong>Processing</strong>

                                </div>

                                <div className="info-row">

                                    <span>Next Step</span>

                                    <strong>Preparing Shipment</strong>

                                </div>

                            </div>

                            <button
                                className="orders-btn"
                                onClick={() => navigate("/myorders")}
                            >

                                View My Orders

                            </button>

                            <Link
                                to="/shop"
                                className="continue-shopping"
                            >

                                Continue Shopping

                            </Link>

                            <p className="redirect-text">

                                You'll be redirected automatically in a few
                                seconds.

                            </p>

                        </>

                }

            </div>

        </div>

    );

};

export default PaymentSuccess;