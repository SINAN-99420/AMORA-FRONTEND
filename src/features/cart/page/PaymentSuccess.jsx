import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
                console.log(error.response?.status);

                setMessage(
                    error.response?.data?.message ||
                    "Payment verification failed."
                );

                setLoading(false);
            }

        };

        verifyPayment();

    }, []);

    return (

        <div className="payment-success-page">

            <div className="payment-success-card">

                {
                    loading ?

                        <>

                            <h2>Verifying Payment...</h2>

                            <p>Please wait.</p>

                        </>

                        :

                        <>

                            <h2>✅ Payment Successful</h2>

                            <p>{message}</p>

                            <p>
                                Redirecting to My Orders...
                            </p>

                        </>

                }

            </div>

        </div>

    );

};

export default PaymentSuccess;