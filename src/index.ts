import {
    getFeaturedProducts, 
    getProductsByCategory,
    calculateTotalInventoryValue,
    getProductById,
    getProductNames,
    getStockStatus
} from "./services/productService";

import { products } from "./data/products";

import type { Product } from "./types/product";

console.log("B2B Product Catalog");
console.log(`Loaded products: ${products.length}`);

// const featuredProducts = getFeaturedProducts(products);
// console.log(`Featured products: ${featuredProducts.length}`);

// const categoryProducts = getProductsByCategory(products, "Electronics");
// console.log(`Electronics products: ${categoryProducts.length}`);

// const totalInventoryValue = calculateTotalInventoryValue(products);
// console.log(`Total inventory value: $${totalInventoryValue.toFixed(2)}`);

// const productId = 3;
// const product = getProductById(products,productId);
// if (product) {
//     console.log(`Product with ID 3: ${product.name}, Price: $${product.price}`);
// } else {
//     console.log("Product with ID 3 not found.");
// }

// const productNames = getProductNames(products);
// console.log("Product Names:");
// productNames.forEach((name) => console.log(name));

// const stockStatus = getStockStatus(products[0]);
// console.log(`Stock status of product name: ${products[0].name}, stockNumber: ${products[0].stock}, stockStatus: ${stockStatus}`);

const productId2 = 2;
const productId3 = 3;
const missingProduct = 999;
const product2 = getProductById(products, productId2);
const product3 = getProductById(products, productId3);
const product4 = getProductById(products, missingProduct);


function printProductDetails(
    product: Product | undefined,
    productId: number,
): void {
    if (product) {
        console.log(
            `Product with ID: ${productId}, ` +
            `Name: ${product.name}, ` +
            `Description: ${product.description ?? "No description available"}, ` +
            `Price: $${product.price}`
        );
    } else {
        console.log(`Product with ID: ${productId} not found.`);
    }
}

printProductDetails(product2, productId2);
printProductDetails(product3, productId3);
printProductDetails(product4, missingProduct);