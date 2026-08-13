import {
    getFeaturedProducts, 
    getProductsByCategory,
    calculateTotalInventoryValue,
} from "./services/productService";

import { products } from "./data/products";

console.log("B2B Product Catalog");
console.log(`Loaded products: ${products.length}`);

const featuredProducts = getFeaturedProducts(products);
console.log(`Featured products: ${featuredProducts.length}`);

const categoryProducts = getProductsByCategory(products, "Electronics");
console.log(`Electronics products: ${categoryProducts.length}`);

const totalInventoryValue = calculateTotalInventoryValue(products);
console.log(`Total inventory value: $${totalInventoryValue.toFixed(2)}`);