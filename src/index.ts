import { getField, updateField } from "./utils/objectUtils";

import {
  getFeaturedProducts,
  getProductsByCategory,
  calculateTotalInventoryValue,
  getProductById,
  getProductNames,
  getStockStatus,
  sortProductsByPrice,
  updateProductStock,
  updateProductStockById,
  updateSupplierName,
  updateSupplierNameById,
  getProductField,
  updateProduct,
  updateSupplier,
  toProductCard,
  toProductCards,
  countProductsByCategory,
  createProductMap,
} from "./services/productService";

import { products } from "./data/products";

import {
  STOCK_STATUS_LABELS,
  type Product,
  type ProductChanges,
  type ProductKey,
  type SortDirection,
} from "./types/product";

// console.log("B2B Product Catalog");
// console.log(`Loaded products: ${products.length}`);

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

// const productId2 = 2;
// const productId3 = 3;
// const missingProduct = 999;
// const product2 = getProductById(products, productId2);
// const product3 = getProductById(products, productId3);
// const product4 = getProductById(products, missingProduct);

// function printProductDetails(
//     product: Product | undefined,
//     productId: number,
// ): void {
//     if (product) {
//         console.log(
//             `Product with ID: ${productId}, ` +
//             `Name: ${product.name}, ` +
//             `Description: ${product.description ?? "No description available"}, ` +
//             `Price: $${product.price}`
//         );
//     } else {
//         console.log(`Product with ID: ${productId} not found.`);
//     }
// }

// printProductDetails(product2, productId2);
// printProductDetails(product3, productId3);
// printProductDetails(product4, missingProduct);

// console.log('\nOriginal products:');
// products.forEach((product) => {
//     console.log(`${product.name}: $${product.price}`);
// });

// const sortedProductsAsc = sortProductsByPrice(products, "asc");
// console.log("\nSorted products:");
// sortedProductsAsc.forEach((product) => {
//     console.log(`${product.name}: $${product.price}`);
// });

// console.log("\nOriginal products after sorting:");
// products.forEach((product) => {
//     console.log(`${product.name}: $${product.price}`);
// });

// // 降序
// const sortedProductsDesc = sortProductsByPrice(products, "desc");
// console.log("\nSorted products by price DESC:");
// sortedProductsDesc.forEach((product) => {
//     console.log(`${product.name}: $${product.price}`);
// });

// const originalProduct = products[0];
// const updatedProduct = updateProductStock(
//     originalProduct,
//     999,
// );

// console.log("Original stock:", originalProduct.stock);
// console.log("Updated stock:", updatedProduct.stock);
// console.log(
//     "Same object:",
//     originalProduct === updatedProduct,
// );

// const updatedProducts = updateProductStockById(
//     products,
//     1,
//     999,
// );

// console.log(
//     "Original stock:",
//     products[0].stock,
// );

// console.log(
//     "Updated stock:",
//     updatedProducts[0].stock,
// );

// console.log(
//     "Same array:",
//     products === updatedProducts,
// );

// console.log(
//     products[0] === updatedProducts[0],
// );

// console.log(
//     products[1] === updatedProducts[1],
// );

// const originalProduct = products[0];
// // originalProduct.supplier.name = "Old Supplier"

// const updatedProduct = updateSupplierName(
//     originalProduct,
//     "New Supplier",
// );

// console.log(
//     "Same supplier:",
//     originalProduct.supplier === updatedProduct.supplier,
// );

// console.log(
//     "Original supplier:",
//     originalProduct.supplier.name,
// );

// console.log(
//     "Updated supplier:",
//     updatedProduct.supplier.name,
// );

// const updatedProducts = updateSupplierNameById(
//     products,
//     1,
//     "Global Tech Supplier",
// );

// console.log(
//     "Original supplier:",
//     products[0].supplier.name,
// );

// console.log(
//     "Updated supplier:",
//     updatedProducts[0].supplier.name,
// );

// console.log(
//     "Same array:",
//     products === updatedProducts,
// );

// console.log(
//     "Same product:",
//     products[0] === updatedProducts[0],
// );

// console.log(
//     "Same supplier:",
//     products[0].supplier === updatedProducts[0].supplier,
// );

// console.log(
//     "Same unchanged product:",
//     products[1] === updatedProducts[1],
// );

// interface SortConfig {
//     direction: SortDirection;
//     label: string;
// }

// const sortConfig = {
//     direction: "asc",
//     label: "Price: Low to High",
// } satisfies SortConfig;

// const sortedProducts =
//     sortProductsByPrice(
//         products,
//         sortConfig.direction,
//     );

// const key1: ProductKey = "name";
// const key2: ProductKey = "price";

// const firstProduct = products[0];

// const productName = getProductField(firstProduct, "name");

// const productPrice = getProductField(firstProduct, "price");

// const productFeatured = getProductField(firstProduct, "featured");

// const productDescription = getProductField(firstProduct, "description");

// const name = getField(firstProduct, "name");

// const price = getField(firstProduct, "price");

// const featured = getField(firstProduct, "featured");

// const description = getField(firstProduct, "description");

// const supplier = getField(firstProduct, "supplier");

// const user = {
//     id: 1,
//     username: "Darren",
//     active: true,
// };

// const username =
//     getField(user, "username");

// const active =
//     getField(user, "active");

// const updatedStockProduct =
//     updateField(firstProduct, "stock", 999);

// const updatedNameProduct =
//     updateField(firstProduct, "name", "Updated Product");

// const updatedFeaturedProduct =
//     updateField(firstProduct, "featured", false);

// const originalProduct = products[0];
// const updatedProduct = updateProduct(
//     originalProduct,
//     {
//         name: "Premium Industrial LED High Bay Light",
//         stock: 100,
//     },
// );

// console.log("Original name:", originalProduct.name);
// console.log("Updated name:", updatedProduct.name);

// console.log("Original stock:", originalProduct.stock);
// console.log("Updated stock:", updatedProduct.stock);

// console.log(
//     "Same product:",
//     originalProduct === updatedProduct,
// );

// const originalProduct = products[0];
// const updatedProduct = updateSupplier(
//     originalProduct,
//     {
//         name: "Global Tech Supplier",
//     },
// );

// console.log(
//     "Original supplier:",
//     originalProduct.supplier.name,
// );
// console.log(
//     "Updated supplier:",
//     updatedProduct.supplier.name,
// );
// console.log(
//     "Same product:",
//     originalProduct === updatedProduct,
// );
// console.log(
//     "Same supplier:",
//     originalProduct.supplier === updatedProduct.supplier,
// );

// const changes1: ProductChanges = {
//     name: "Premium LED Light",
// };

// const changes2: ProductChanges = {
//     stock: 100,
// };

// const changes3: ProductChanges = {
//     supplier: {
//         name: "Global Tech Supplier",
//     },
// };

// const changes4: ProductChanges = {
//     name: "Premium LED Light",
//     stock: 100,
//     supplier: {
//         name: "Global Tech Supplier",
//     },
// };

const originalProduct = products[0];

// const updatedProduct = updateProduct(
//     originalProduct,
//     {
//         name: "Premium Industrial LED High Bay Light",
//         stock: 100,

//         supplier: {
//             name: "Global Tech Supplier",
//         },
//     },
// );

// console.log(
//     "Original name:",
//     originalProduct.name,
// );

// console.log(
//     "Updated name:",
//     updatedProduct.name,
// );

// console.log(
//     "Original stock:",
//     originalProduct.stock,
// );

// console.log(
//     "Updated stock:",
//     updatedProduct.stock,
// );

// console.log(
//     "Original supplier:",
//     originalProduct.supplier.name,
// );

// console.log(
//     "Updated supplier:",
//     updatedProduct.supplier.name,
// );

// console.log(
//     "Country:",
//     updatedProduct.supplier.country,
// );

// console.log(
//     "Same product:",
//     originalProduct === updatedProduct,
// );

// console.log(
//     "Same supplier:",
//     originalProduct.supplier === updatedProduct.supplier,
// );

// const updatedProduct = updateProduct(
//     originalProduct,
//     {
//         stock: 100,
//     },
// );

// console.log(
//     originalProduct === updatedProduct,
// );

// console.log(
//     originalProduct.supplier === updatedProduct.supplier,
// );

// const productCards =
//     toProductCards(products);

// productCards.forEach((card) => {
//     console.log(
//         `${card.name} - $${card.price.toFixed(2)}`,
//     );
// });

// const categoryCounts = countProductsByCategory(products);
// console.log(categoryCounts);

const productMap = createProductMap(products);
// console.log(productMap);
// console.log(productMap[3].name,);

const existingProduct = productMap[3];

const missingProduct = productMap[999];

console.log(productMap[3]?.name ?? "Product not found");

console.log(productMap[999]?.name ?? "Product not found");
