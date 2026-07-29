import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import client from "../../../lib/ApiClient";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils/imageUrl";

export default function OrderDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({});

    const [orders, setOrders] = useState([]);

    const [lowStock, setLowStock] = useState([]);

    const [wishlistProducts, setWishlistProducts] = useState([]);

    const [activeTab, setActiveTab] = useState("All Orders");

    const [search, setSearch] = useState("");

    const [sort, setSort] = useState("newest");

    const [loading, setLoading] = useState(true);

    const getDashboard = async () => {

        try {

            const res = await client.get(
                "/admin-dashboard-cards/"
            );

            setDashboard(
                res.data
            );

        }

        catch (err) {

            console.log(err);

        }

    };

    const getOrders = async () => {

        try {

            let status = "";

            if (activeTab !== "All Orders") {

                status = activeTab;

            }

            const res = await client.get(

                `/admin-orders/?search=${search}&status=${status}&sort=${sort}`

            );

            setOrders(
                res.data
            );

        }

        catch (err) {

            console.log(err);

        }

    };

    const getLowStock = async () => {

        try {

            const res = await client.get(
                "/low-stock-products/"
            );

            setLowStock(
                res.data
            );

        }

        catch (err) {

            console.log(err);

        }

    };

    const getWishlistProducts = async () => {

        try {

            const res = await client.get(
                "/wishlist-products/"
            );

            setWishlistProducts(
                res.data
            );

        }

        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        const loadData = async () => {

            setLoading(true);

            await Promise.all([

                getDashboard(),

                getOrders(),

                getLowStock(),

                getWishlistProducts()

            ]);

            setLoading(false);

        };

        loadData();

    }, []);

    useEffect(() => {

        getOrders();

    }, [

        search,

        sort,

        activeTab

    ]);
    const API_URL = import.meta.env.VITE_API_URL;
    const handleExport = () => {

        window.open(
            `${API_URL}/export-orders-csv/`,
            "_blank"
        );

    };

    const handleSort = (e) => {

        setSort(

            e.target.value

        );

    };

    const handleOrderAction = (id) => {

        navigate(

            `/orderDashboard/details/${id}`

        );

    };

    const changePage = (page) => {

        console.log(page);

    };

    return (

        <div className="dashboard">

            <main className="content">

                <section className="page-header">

                    <div>

                        <h1>

                            Order Management

                        </h1>

                        <p>

                            Oversee your boutique's latest transactions and logistical status.

                        </p>

                    </div>

                    <button
                        className="secondary"
                        onClick={handleExport}
                    >

                        ↓ Export List

                    </button>

                </section>

                <section className="stats">

                    <div className="stat-card">

                        <p>

                            Total Orders

                        </p>

                        <h2>

                            {dashboard.total_orders || 0}

                        </h2>

                        <span>

                            All Orders

                        </span>

                    </div>

                    <div className="stat-card">

                        <p>

                            Pending Orders

                        </p>

                        <h2>

                            {dashboard.pending_orders || 0}

                        </h2>

                        <span>

                            Waiting for Action

                        </span>

                    </div>

                    <div className="stat-card">

                        <p>

                            Shipped Orders

                        </p>

                        <h2>

                            {dashboard.shipped_orders || 0}

                        </h2>

                        <span>

                            In Transit

                        </span>

                    </div>

                    <div className="stat-card">

                        <p>

                            Revenue

                        </p>

                        <h2>

                            NZ$

                            {

                                dashboard.revenue || 0

                            }

                        </h2>

                        <span>

                            Paid Orders

                        </span>

                    </div>

                </section>

                <section className="orders-box">

                    <div className="tabs">
                        <div className="tabs">

                            {

                                [

                                    "All Orders",

                                    "Pending",

                                    "Processing",

                                    "Shipped",

                                    "Delivered",

                                    "Cancelled"

                                ].map((tab) => (

                                    <button
                                        key={tab}
                                        className={
                                            activeTab === tab
                                                ? "tab-active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setActiveTab(tab)
                                        }
                                    >

                                        {tab}

                                    </button>

                                ))

                            }

                            <input
                                type="text"
                                className="order-search"
                                placeholder="Search Order ID / Customer"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                            <select
                                value={sort}
                                onChange={handleSort}
                            >

                                <option value="newest">

                                    Newest

                                </option>

                                <option value="oldest">

                                    Oldest

                                </option>

                                <option value="high_amount">

                                    Highest Amount

                                </option>

                                <option value="low_amount">

                                    Lowest Amount

                                </option>

                            </select>

                        </div>

                        <table>

                            <thead>

                                <tr>

                                    <th>ORDER ID</th>

                                    <th>CUSTOMER</th>

                                    <th>DATE</th>

                                    <th>AMOUNT</th>

                                    <th>STATUS</th>

                                    <th>ACTION</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    loading

                                        ?

                                        (

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    style={{
                                                        textAlign: "center",
                                                        padding: "40px"
                                                    }}
                                                >

                                                    Loading...

                                                </td>

                                            </tr>

                                        )

                                        :

                                        orders.length === 0

                                            ?

                                            (

                                                <tr>

                                                    <td
                                                        colSpan="6"
                                                        style={{
                                                            textAlign: "center",
                                                            padding: "40px"
                                                        }}
                                                    >

                                                        No Orders Found

                                                    </td>

                                                </tr>

                                            )

                                            :

                                            orders.map((order) => (

                                                <tr
                                                    key={order.id}
                                                >

                                                    <td>

                                                        <strong>

                                                            {`ORD-${String(order.id).padStart(3, "0")}`}

                                                        </strong>

                                                    </td>

                                                    <td className="customer">

                                                        <div>

                                                            {

                                                                order.customer_name
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase()

                                                            }

                                                        </div>

                                                        <section>

                                                            {

                                                                order.customer_name

                                                            }

                                                            <small>

                                                                {

                                                                    order.customer_email

                                                                }

                                                            </small>

                                                        </section>

                                                    </td>

                                                    <td>

                                                        {

                                                            new Date(

                                                                order.created_at

                                                            ).toLocaleDateString()

                                                        }

                                                    </td>

                                                    <td>

                                                        <strong>

                                                            NZ$

                                                            {

                                                                order.total_amount

                                                            }

                                                        </strong>

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`status ${order.status}`}
                                                        >

                                                            {order.status}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <button
                                                            className="admin-view-btn"
                                                            onClick={() =>
                                                                handleOrderAction(
                                                                    order.id
                                                                )
                                                            }
                                                        >

                                                            👁

                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                }

                            </tbody>

                        </table>
                        <div className="pagination">

                            <span>

                                Total Orders : {orders.length}

                            </span>

                            <div>

                                <button
                                    onClick={() =>
                                        changePage("prev")
                                    }
                                >

                                    ‹

                                </button>

                                <button
                                    className="page-active"
                                >

                                    1

                                </button>

                                <button
                                    onClick={() =>
                                        changePage("next")
                                    }
                                >

                                    ›

                                </button>

                            </div>

                        </div>
                    </div>

                </section>

                <section className="low-stock-box">

                    <div className="low-stock-header">

                        <h2>

                            Low Stock Products

                        </h2>

                    </div>

                    <table>

                        <thead>

                            <tr>

                                <th>

                                    PRODUCT

                                </th>

                                <th>

                                    SIZE

                                </th>

                                <th>

                                    STOCK

                                </th>

                                <th>

                                    STATUS

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                lowStock.length === 0

                                    ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "35px"
                                                }}
                                            >

                                                No Low Stock Products

                                            </td>

                                        </tr>

                                    )

                                    :

                                    lowStock.map((item) => (

                                        <tr
                                            key={item.id}
                                        >

                                            <td>

                                                {

                                                    item.product_name

                                                }

                                            </td>

                                            <td>

                                                {

                                                    item.size

                                                }

                                            </td>

                                            <td>

                                                {

                                                    item.stock

                                                }

                                            </td>

                                            <td>

                                                <span
                                                    className="stock-low"
                                                >

                                                    Low Stock

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </section>

                <section className="wishlist-box">

                    <div className="wishlist-header">

                        <h2>

                            Wishlist Products

                        </h2>

                    </div>

                    <table>

                        <thead>

                            <tr>

                                <th>

                                    IMAGE

                                </th>

                                <th>

                                    PRODUCT

                                </th>

                                <th>

                                    CATEGORY

                                </th>

                                <th>

                                    WISHLIST COUNT

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                wishlistProducts.length === 0

                                    ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "35px"
                                                }}
                                            >

                                                No Wishlist Products

                                            </td>

                                        </tr>

                                    )

                                    :

                                    wishlistProducts.map((item) => (

                                        <tr
                                            key={item.product_id}
                                        >
                                            <td>

                                                {
                                                    item.image
                                                        ?

                                                        <img
                                                            src={item.image}
                                                            alt={item.product_name}
                                                            className="wishlist-product-image"
                                                        />

                                                        :

                                                        <div className="wishlist-no-image">

                                                            No Image

                                                        </div>
                                                }

                                            </td>

                                            <td>

                                                <strong>

                                                    {item.product_name}

                                                </strong>

                                            </td>

                                            <td>

                                                {item.category}

                                            </td>

                                            <td>

                                                <span className="wishlist-count">

                                                    {item.wishlist_count}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </section>

            </main>

        </div>

    );

}