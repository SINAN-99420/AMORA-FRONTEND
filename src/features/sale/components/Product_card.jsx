import React, { useState } from "react";
import "./../styles/ProductCard.css";
// import '../styles/Product_filter.css';

import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Wishlist_post } from "../../wishlist/api/Wishlisht_Api";
import WishlistQuery from "../../wishlist/queries/WishlistQuery";
import { getImageUrl } from "../../../utils/imageUrl";
// popup message ( toast )
import showToast from "../../../utils/toast";

function Product_card({ products = [], isLoading, error }) {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    const indexOfLastProduct = currentPage * itemsPerPage;

    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(
        products.length / itemsPerPage
    );

    const {
        data: wishdata,
        refetch
    } = WishlistQuery();

    const addTowislist = async (
        product,
        e
    ) => {

        e.stopPropagation();

        try {

            const wishlist = wishdata || [];

            const alreadyExist = wishlist.some(
                (item) =>
                    item.product === product.id
            );

            if (alreadyExist) {

                showToast.info(
                    "Product already exists in wishlist"
                );

                return;

            }

            await Wishlist_post(product);

            await refetch();

            showToast.success(
                "Product added to wishlist"
            );

        }

        catch (err) {

            console.log(err);

        }

    };

    if (isLoading) {
    return <h2 className="loading-state">Loading Products...</h2>;
}

if (error) {
    return <h2 className="error-state">Something went wrong.</h2>;
}

if (!products || products.length === 0) {
    return <h2 className="error-state">No Products Found.</h2>;
}

    return (

        <div className="catalog-container">

            <section
                className={`products ${
                    products.length <= 3
                        ? "shop-few-products"
                        : "shop-many-products"
                }`}
            >

                {

                    currentProducts.length > 0 ? (

                        currentProducts.map(
                            (product) => {

                                const firstVariant =
                                    product.variants?.[0];

                                const primaryImageRelative =
                                    firstVariant?.images?.find(
                                        img =>
                                            img.is_primary
                                    )?.image;

                                const primaryImage =
                                    primaryImageRelative
                                        ? getImageUrl(primaryImageRelative)
                                        : "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600";
                                    
                                // Offer Details

                                const startingPrice =
                                    product.starting_price;

                                const discountedPrice =
                                    product.discounted_price;

                                const hasOffer =
                                    product.has_offer;

                                const discountPercentage =
                                    product.discount_percentage;
                                                                return (

                                    <div
                                        className="product_card"
                                        key={product.id}
                                        onClick={() =>
                                            navigate(
                                                `/single/${product.id}`
                                            )
                                        }
                                    >

                                        <div className="product_img">

                                            <button
                                                className="favorite_btn"
                                                onClick={(e) =>
                                                    addTowislist(
                                                        product,
                                                        e
                                                    )
                                                }
                                                aria-label="Wishlist"
                                            >
                                                <FaHeart />
                                            </button>

                                            {
                                                hasOffer && (

                                                    <div className="offer-badge">

                                                        {discountPercentage}% OFF

                                                    </div>

                                                )
                                            }

                                            <img
                                                src={primaryImage}
                                                alt={product.name}
                                            />

                                            <button className="quick-add-bar">

                                                VIEW PRODUCT

                                            </button>

                                        </div>

                                        <div className="product_info">

                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                                }}
                                            >

                                                <span className="product-category">

                                                    {
                                                        product.category?.name ||
                                                        "Premium Wear"
                                                    }

                                                </span>

                                                {/* <div className="star-rating">

                                                    <span className="rating-val">

                                                        4.8

                                                    </span>

                                                    <span className="star-icon">

                                                        ★

                                                    </span>

                                                </div> */}

                                            </div>

                                            <h3 className="product-title">

                                                {product.name}

                                            </h3>

                                            <div className="product-footer">

                                                {

                                                    hasOffer ? (

                                                        <div className="price-box">

                                                            <span className="old-price">

                                                                NZD $

                                                                {
                                                                    Number(
                                                                        startingPrice
                                                                    ).toFixed(2)
                                                                }

                                                            </span>

                                                            <span className="new-price">

                                                                NZD $

                                                                {
                                                                    Number(
                                                                        discountedPrice
                                                                    ).toFixed(2)
                                                                }

                                                            </span>

                                                        </div>

                                                    ) : (

                                                        <span className="price">

                                                            {

                                                                startingPrice

                                                                    ? `NZD $${Number(
                                                                        startingPrice
                                                                    ).toFixed(2)}`

                                                                    : "Price unavailable"

                                                            }

                                                        </span>

                                                    )

                                                }

                                            </div>

                                        </div>

                                    </div>

                                );

                            }

                        )

                    ) : (

                        <div className="no-products">

                            products Loading....

                        </div>

                    )

                }

            </section>
                  {totalPages > 1 && (

        <div className="pagination-wrapper">

          <div className="numbers">

            {

              Array.from(
                {
                  length: totalPages
                },
                (_, i) => i + 1
              ).map((number) => (

                <div
                  key={number}
                  onClick={() =>
                    setCurrentPage(
                      number
                    )
                  }
                  className={`page-num ${
                    currentPage === number
                      ? "active"
                      : ""
                  }`}
                >

                  {number}

                </div>

              ))

            }

          </div>

        </div>

      )}

    </div>

  );

}

export default Product_card;