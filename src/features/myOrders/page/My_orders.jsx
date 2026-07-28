import React, { useEffect, useState } from "react";
import client from "../../../lib/ApiClient";
import "../styles/Myorders.css";

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const response = await client.get(
                "/my-orders/"
            );

            setOrders(
                response.data
            );

        }

        catch {

            setError(
                "Unable to load your orders."
            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleCancelOrder = (orderId) => {

        setSelectedOrderId(
            orderId
        );

        setShowCancelModal(
            true
        );

    };

    const confirmCancelOrder = async () => {

        try {

            await client.patch(
                `/cancel-order/${selectedOrderId}/`
            );

            setOrders((previousOrders) =>

                previousOrders.map((order) =>

                    order.id === selectedOrderId

                        ? {
                            ...order,
                            status: "Cancelled"
                        }

                        : order

                )

            );

            setShowCancelModal(false);

            setSelectedOrderId(null);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to cancel order."

            );

        }

    };

    const closeCancelModal = () => {

        setShowCancelModal(false);

        setSelectedOrderId(null);

    };

    const getStatusClass = (status) => {

        switch (status?.toLowerCase()) {

            case "pending":
                return "pending";

            case "processing":
                return "processing";

            case "shipped":
                return "shipped";

            case "delivered":
                return "delivered";

            case "cancelled":
                return "cancelled";

            default:
                return "";

        }

    };

    if (loading) {

        return (

            <div className="my-orders-page">

                <div className="my-orders-loading">

                    Loading your orders...

                </div>

            </div>

        );

    }

    if (error) {

        return (

            <div className="my-orders-page">

                <div className="my-orders-error">

                    {error}

                </div>

            </div>

        );

    }

    if (!orders.length) {

        return (

            <div className="my-orders-page">

                <div className="my-orders-empty">

                    <h2>

                        No Orders Yet

                    </h2>

                    <p>

                        Your orders will appear here after your first purchase.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="my-orders-page">

            <div className="my-orders-header">

                <h1>

                    My Orders

                </h1>

                <p>

                    Track and manage your recent purchases.

                </p>

            </div>

            <div className="my-orders-list">
                                {orders.map((order) => (

                    <div
                        className="my-order-card"
                        key={order.id}
                    >

                        <div className="my-order-image">

                             <img
                                src={
                                    order.items?.[0]?.product_image
                                        ? `http://127.0.0.1:8000${order.items[0].product_image}`
                                        : "/images/no-image.png"
                                }
                                alt={order.items?.[0]?.product_name}
                            /> 

                        </div>

                        <div className="my-order-content">

                            <div className="my-order-top">

                                <div className="my-order-details">

                                    <h2>

                                        {
                                            order.items?.[0]?.product_name
                                        }

                                    </h2>

                                    <p className="my-order-variant">

                                        {order.items?.[0]?.color || "Standard"}

                                        {

                                            order.items?.[0]?.size &&
                                            ` • ${order.items[0].size}`

                                        }

                                    </p>

                                </div>

                                <span
                                    className={`my-order-status ${getStatusClass(order.status)}`}
                                >

                                    {order.status}

                                </span>

                            </div>

                            <div className="my-order-bottom">

                                <div className="my-order-info">

                                    <div className="my-order-info-box">

                                        <span>

                                            Order ID

                                        </span>

                                        <strong>

                                            #{order.id}

                                        </strong>

                                    </div>

                                    <div className="my-order-info-box">

                                        <span>

                                            Ordered On

                                        </span>

                                        <strong>

                                            {

                                                new Date(
                                                    order.created_at
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )

                                            }

                                        </strong>

                                    </div>

                                </div>

                                {

                                    (
                                        order.status === "Pending" ||

                                        order.status === "Processing"

                                    ) && (

                                        <button
                                            className="my-order-cancel-btn"
                                            onClick={() =>
                                                handleCancelOrder(order.id)
                                            }
                                        >

                                            Cancel Order

                                        </button>

                                    )

                                }

                            </div>

                        </div>

                    </div>

                ))}

            </div>
                        {
                showCancelModal && (

                    <div className="cancel-modal-overlay">

                        <div className="cancel-modal">

                            <div className="cancel-modal-icon">

                                !

                            </div>

                            <h2>

                                Cancel Order?

                            </h2>

                            <p>

                                Are you sure you want to cancel this order?
                                This action cannot be undone.

                            </p>

                            <div className="cancel-modal-actions">

                                <button
                                    className="cancel-modal-close"
                                    onClick={closeCancelModal}
                                >

                                    Keep Order

                                </button>

                                <button
                                    className="cancel-modal-confirm"
                                    onClick={confirmCancelOrder}
                                >

                                    Yes, Cancel

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );

};

export default MyOrders;