import type { Product } from "../types/product";

// 显式声明 Product[]，让编译器检查每条模拟数据的结构。
export const products: Product[] = [
    {
        id: 1,
        name: "Industrial LED High Bay Light",
        category: "Lighting",
        price: 89.99,
        stock: 6,
        featured: true,
        supplier: {
        name: "Shenzhen BrightTech Co., Ltd.",
        country: "China",
        },
    },
    {
        id: 2,
        name: "Outdoor Solar Flood Light",
        category: "Lighting",
        price: 45.5,
        stock: 80,
        featured: false,
        description: "Energy-efficient solar-powered flood light for outdoor use.",
        supplier: {
            name: "shanghai~~~",
            country: "China"
        }
    },
    {
        id: 3,
        name: "Stainless Steel Water Bottle",
        category: "Drinkware",
        price: 12.75,
        stock: 300,
        featured: true,
        supplier: {
            name: "Marina",
            country: "Filifine"
        }
    },
    {
        id: 4,
        name: "Cotton Canvas Tote Bag",
        category: "Bags",
        price: 6.25,
        stock: 500,
        featured: false,
        description: "Durable and eco-friendly tote bag made from 100% cotton canvas.",
        supplier: {
            name: "Mango",
            country: "Thiland"
        }
    },
    {
        id: 5,
        name: "Portable Bluetooth Speaker",
        category: "Electronics",
        price: 28,
        stock: 150,
        featured: true,
        supplier: {
            name: "Auao",
            country: "Australia"
        }        
    },
];
