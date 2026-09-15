const jwt = require("jsonwebtoken");

function products(req, res) {
    res.status(200).json([
        {
            id: 1,
            name: "Mobile Phone",
            price: 10000,
            category: "Electronics",
            description: "6.5 inch display, 128GB storage, dual camera",
            image: "https://placehold.co/400x400/4f46e5/ffffff?text=Mobile"
        },
        {
            id: 2,
            name: "Television",
            price: 20000,
            category: "Electronics",
            description: "43 inch Smart LED TV with HDR support",
            image: "https://placehold.co/400x400/0891b2/ffffff?text=TV"
        },
        {
            id: 3,
            name: "Laptop",
            price: 45000,
            category: "Electronics",
            description: "Intel i5, 8GB RAM, 512GB SSD",
            image: "https://placehold.co/400x400/16a34a/ffffff?text=Laptop"
        },
        {
            id: 4,
            name: "Headphones",
            price: 2500,
            category: "Accessories",
            description: "Wireless over-ear headphones with noise cancellation",
            image: "https://placehold.co/400x400/dc2626/ffffff?text=Headphones"
        },
        {
            id: 5,
            name: "Smart Watch",
            price: 8000,
            category: "Wearables",
            description: "Fitness tracker with heart rate monitor",
            image: "https://placehold.co/400x400/ea580c/ffffff?text=Watch"
        },
        {
            id: 6,
            name: "Bluetooth Speaker",
            price: 3200,
            category: "Accessories",
            description: "Portable speaker with 12hr battery life",
            image: "https://placehold.co/400x400/7c3aed/ffffff?text=Speaker"
        },
        {
            id: 7,
            name: "Camera",
            price: 35000,
            category: "Electronics",
            description: "DSLR camera with 24MP sensor",
            image: "https://placehold.co/400x400/db2777/ffffff?text=Camera"
        },
        {
            id: 8,
            name: "Tablet",
            price: 18000,
            category: "Electronics",
            description: "10 inch tablet, 64GB storage, Wi-Fi + LTE",
            image: "https://placehold.co/400x400/65a30d/ffffff?text=Tablet"
        },
    ]);
}

module.exports = {
    products
}