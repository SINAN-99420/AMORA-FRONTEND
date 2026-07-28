import React, { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from "react-icons/fa";
import '../styles/Product_filter.css';
import { useSearchParams } from "react-router-dom";
import Category_hooks from '../../../hooks/Category_hooks';

function Product_filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: categories = [] } = Category_hooks();

    const [filters, setFilters] = useState({
        category: searchParams.get("category") || "",
        // size: searchParams.get("size") || "",
        occasion: searchParams.get("occasion") || "",
        in_stock: searchParams.get("in_stock") || "",
        sort: searchParams.get("sort") || ""
    });

    const handleChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams);

        Object.entries(filters).forEach(([key, value]) => {

            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }

        });

        setSearchParams(params);
    };

    const clearFilters = () => {

        setFilters({
            category: "",
            // size: "",
            occasion: "",
            in_stock: "",
            sort: ""
        });

        const params = new URLSearchParams(searchParams);

        params.delete("category");
        params.delete("size");
        params.delete("occasion");
        params.delete("in_stock");
        params.delete("sort");
        params.delete("offer");

        setSearchParams(params);

    };

    const categoryOptions = [
        {
            label: "All Categories",
            value: ""
        },
        ...categories.map(category => ({
            label: category.name,
            value: String(category.id)
        }))
    ];

    const sortOptions = [
        {
            label: "Default",
            value: ""
        },
        {
            label: "Price: Low to High",
            value: "price_low"
        },
        {
            label: "Price: High to Low",
            value: "price_high"
        },
        {
            label: "Newest",
            value: "new"
        }
    ];
    const sizeOptions = [
        { label: "All Sizes", value: "" },
        { label: "XS", value: "XS" },
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
        { label: "XXL", value: "XXL" }
    ];

    const CustomSelect = ({ options, value, onChange }) => {
        const [open, setOpen] = useState(false);
        const selectRef = useRef();

        useEffect(() => {
            const closeDropdown = (e) => {
                if (selectRef.current && !selectRef.current.contains(e.target)) {
                    setOpen(false);
                }
            };

            document.addEventListener("mousedown", closeDropdown);

            return () => {
                document.removeEventListener("mousedown", closeDropdown);
            };
        }, []);

        const selectedOption =
            options.find(option => option.value === value) || options[0];

        return (
            <div className="custom-select" ref={selectRef}>
                <button style={{}}
                    type="button"
                    className="select-btn"
                    onClick={() => setOpen(!open)}>

                    <div>
                        {selectedOption.label}
                    </div>

                    <span className={open ? "arrow open" : "arrow"}>
                        <FaAngleDown />
                    </span>
                </button>

                { open &&
                    <ul className="select-options">
                        {
                            options.map(option => (
                                <li
                                    key={option.value}
                                    className={
                                        value === option.value
                                            ? "select-option active"
                                            : "select-option"
                                    }
                                    onClick={() => {
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
        );
    };

    return (
        <div style={{
            position: 'sticky',
            top: '80px',
            border: '1px solid #b4b4b4',
            padding: '15px',
            borderRadius: '10px'
        }}>
            <aside className="filter_sidebar">
                <div className="filter_heading">
                    <h2>Filters</h2>
                    <button
                        className="clear_btn"
                        onClick={clearFilters}
                    >
                        Clear All
                    </button>
                </div>

                <div className="filter_group">
                    <label>Category</label>
                    <CustomSelect
                        options={categoryOptions}
                        value={filters.category}
                        onChange={(value) => handleChange("category", value)}
                    />
                </div>

                {/* <div className="filter_group">
                    <label>Price</label>
                    <CustomSelect
                        options={priceOptions}
                        value={filters.price}
                        onChange={(value) => handleChange("price", value)}
                    />
                </div> */}

                <div className="filter_group">

                    <label>
                        Sort
                    </label>

                    <CustomSelect
                        options={sortOptions}
                        value={filters.sort}
                        onChange={(value) =>
                            handleChange(
                                "sort",
                                value
                            )
                        }
                    />

                </div>

                {/* <div className="filter_group">
                    <label>Size</label>
                    <CustomSelect
                        options={sizeOptions}
                        value={filters.size}
                        onChange={(value) => handleChange("size", value)}
                    />
                </div> */}

                <div className="apply_btn_wrapper">
                    <button
                        className="apply_btn"
                        onClick={applyFilters}
                    >
                        Apply Filters
                    </button>
                </div>
            </aside>
        </div>
    );
}

export default Product_filter;