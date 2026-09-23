import { getField, sum, updateField } from "./utils/objectUtils";

import {
  createTodo,
  deleteTodo,
  fetchTodo,
  fetchTodos,
  fetchTodosByQuery,
  replaceTodo,
  updateTodo,
} from "./api";

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
  filterProducts,
  calculateSelectedStock,
  getPriceRange,
  findProduct,
  searchProduct,
  getRequiredProductById,
  fetchProductById,
  fetchProductMessage,
} from "./services/productService";

import { isProduct, assertIsProduct } from "./validators";

import { products } from "./data/products";

import {
  ProductFilterOptions,
  STOCK_STATUS_LABELS,
  type Product,
  type ProductChanges,
  type ProductKey,
  type SortDirection,
} from "./types/product";

import {
  DiscountPricing,
  NormalPricing,
  ProductEntity,
} from "./models/ProductEntity";
import { Sellable } from "./types/contracts";
import {
  BaseProduct,
  DiscountProduct,
  PhysicalProduct,
} from "./models/BaseProduct";
import { waitForMessage } from "./async/asyncDemo";
import { request } from "./api/httpClient";
import { API_BASE_URL } from "./config/apiConfig";

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

// const originalProduct = products[0];

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

// const productMap = createProductMap(products);
// // console.log(productMap);
// // console.log(productMap[3].name,);

// const existingProduct = productMap[3];

// const missingProduct = productMap[999];

// console.log(productMap[3]?.name ?? "Product not found");

// console.log(productMap[999]?.name ?? "Product not found");

// const lightingProducts = filterProducts(products, {
//   category: "Lighting",
// });
// console.log(lightingProducts.map((product) => product.name));

// const expensiveProducts = filterProducts(products, {
//   minPrice: 40,
// });
// console.log(expensiveProducts.map((product) => product.price));

// const featuredProducts = filterProducts(products, {
//   featuredOnly: true,
// });
// console.log(featuredProducts.map((product) => product.featured));

// const filteredProducts = filterProducts(products, {
//   category: "Lighting",
//   minPrice: 40,
//   featuredOnly: true,
// });
// console.log(filteredProducts);

// const filterOptions: ProductFilterOptions = {
//   category: "Lighting",
//   minPrice: 40,
//   featuredOnly: true,
// };

// const { category: selectedCategory, ...otherOptions } = filterOptions;

// console.log("Selected category:", selectedCategory);

// console.log("Other options:", otherOptions);

// const { featuredOnly: onlyFeatured = false } = {};

// console.log(onlyFeatured);

// const selectedStock = calculateSelectedStock(
//   products[0],
//   products[2],
//   products[4],
// );

// console.log("Selected stock:", selectedStock);

// console.log(sum(10, 20, 30));

// const values = [100, 200, 300];

// console.log(sum(...values));

// const [minPrice, maxPrice] = getPriceRange(products);

// console.log("Min price:", minPrice);

// console.log("Max price:", maxPrice);

// const productById = findProduct(products, 1);

// const productByName = findProduct(products, "Industrial LED High Bay Light");

// console.log("Product by ID:", productById);

// console.log("Product by Name:", productByName);

// const byId = searchProduct(products, 1);

// const byKeyword = searchProduct(products, "Light");

// const byOptions = searchProduct(products, {
//   category: "Lighting",
//   featuredOnly: true,
// });

// console.log("By ID:", byId?.name ?? "Product not found");

// console.log(
//   "By keyword:",
//   byKeyword.map((product) => product.name),
// );

// console.log(
//   "By options:",
//   byOptions.map((product) => product.name),
// );

// const unknownValue: unknown = {
//   id: 1,
//   name: "Test Product",
//   price: 99.99,
// };

// if (isProduct(unknownValue)) {
//   console.log("Product name:", unknownValue.name);
// }

// const invalidValue: unknown = {
//   username: "Darren",
// };

// console.log(isProduct(invalidValue));

// const rawData: unknown[] = [
//   products[0],
//   {
//     id: "wrong",
//     name: "Bad Product",
//   },
//   "hello",
//   null,
// ];

// const validProducts = rawData.filter(isProduct);

// console.log(validProducts.map((product) => product.name));

// const apiData: unknown = products[0];

// assertIsProduct(apiData);

// console.log("Asserted product:", apiData.name);

// const apiData: unknown = {
//   id: "wrong",
// };

// try {
//   assertIsProduct(apiData);

//   console.log("Product:", apiData.name);
// } catch (error) {
//   if (error instanceof Error) {
//     console.log("Validation error:", error.message);
//   } else {
//     console.log("Unknown error");
//   }
// } finally {
//   console.log("Validation finished");
// }

// try {
//   const product = getRequiredProductById(products, 999);

//   console.log(product.name);
// } catch (error) {
//   if (error instanceof ProductNotFoundError) {
//     console.log("Missing product:", error.productId);
//   }
// }

// const product = new ProductEntity(1, "LED Light", 89.99, 10);

// console.log(product.getStock());

// product.updateStock(20);

// console.log(product.getStock());

// const product = new ProductEntity(1, "LED Light", 89.99, 10);

// const sellable: Sellable = product;

// console.log(sellable.getPrice());

// const service = {
//   getPrice(): number {
//     return 199;
//   },
// };

// const anotherSellable: Sellable = service;

// const classProducts: BaseProduct[] = [
//   new PhysicalProduct(1, "LED Light", 100),
//   new DiscountProduct(2, "Speaker", 200, 0.2),
// ];

// classProducts.forEach((product) => {
//   console.log(product.getDisplayName(), product.getPrice());
// });

// const classProducts: BaseProduct[] = [
//   new PhysicalProduct(1, "LED Light", 100),
//   new DiscountProduct(2, "Speaker", 200, 0.2),
// ];

// classProducts.forEach((product) => {
//   console.log(product.getDisplayName(), product.getPrice());
// });

// const normalPricing = new NormalPricing();

// const discountPricing = new DiscountPricing(0.2);

// console.log(normalPricing.calculate(100));

// console.log(discountPricing.calculate(100));

// console.log("Start");

// waitForMessage().then((message) => {
//   console.log(message);
// });

// console.log("End");

// async function runAsyncDemo(): Promise<void> {
//   console.log("Async/await start");

//   const message = await waitForMessage();

//   console.log(message);

//   console.log("Async/await end");
// }

// runAsyncDemo();

// console.log("Outside async function");

// async function runProductDemo(): Promise<void> {
//   try {
//     const product = await fetchProductById(999);

//     console.log("Product:", product.name);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log("Error:", error.message);
//     }
//   }
// }
// runProductDemo();

// async function runDemo(): Promise<void> {
//   console.log("Loading: true");

//   try {
//     const message = await fetchProductMessage(false);

//     console.log(message);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message);
//     }
//   } finally {
//     console.log("Loading: false");
//   }
// }

// fetchProductMessage(false);

// fetchProductMessage(true);

// GET方式
// async function runHttpDemo(): Promise<void> {
//   try {
//     const data = await fetchTodo();

//     console.log("Response data:", data);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log("Request failed:", error.message);
//     } else {
//       console.log("Unknown error");
//     }
//   }
// }

// runHttpDemo();

// async function runTodoDemo(): Promise<void> {
//   try {
//     const response = await fetchTodo();

//     console.log("response:", response);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log("Request failed:", error.message);
//     } else {
//       console.log("Unknown error");
//     }
//   }
// }

// runTodoDemo();

// async function runTodoListDemo(): Promise<void> {
//   try {
//     const todos = await fetchTodos();

//     const completedTodos = todos.filter((todo) => todo.completed);

//     const incompleteTodos = todos.filter((todo) => !todo.completed);

//     console.log("Todo count:", todos.length);

//     console.log("First todo:", todos[0]?.title);

//     console.log("Completed count:", completedTodos.length);

//     console.log("Incomplete count:", incompleteTodos.length);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log("Request failed:", error.message);
//     }
//   }
// }

// runTodoListDemo();

// fetchTodosByQuery({
//   userId: 1,
// });

// fetchTodosByQuery({
//   completed: false,
// });

// fetchTodosByQuery({
//   userId: 1,
//   completed: false,
// });

// POST方式
// async function runCreateTodoDemo(): Promise<void> {
//   try {
//     const newTodo = await createTodo({
//       userId: 6,
//       title: "Learn POST requests...",
//       completed: false,
//     });

//     console.log("Created todo:", newTodo);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log("Create failed:", error.message);
//     }
//   }
// }

// runCreateTodoDemo();

// PUT → 用一份完整数据替换原资源
// PATCH → 只修改部分字段
// PATCH方式
// async function runUpdateTodoDemo(): Promise<void> {
//   try {
//     const updatedTodo = await updateTodo(1, {
//       completed: true,
//     });

//     console.log("Updated todo:", updatedTodo);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log("Update failed:", error.message);
//     }
//   }
// }

// runUpdateTodoDemo();

// PUT方式
// async function runReplaceTodoDemo(): Promise<void> {
//   try {
//     const todo = await replaceTodo(1, {
//       userId: 1,
//       title: "Learn PUT requests",
//       completed: true,
//     });

//     console.log("Replaced todo:", todo);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(
//         "Replace failed:",
//         error.message,
//       );
//     }
//   }
// }

// runReplaceTodoDemo();

// DELETE + 204 No Content
// async function runDeleteTodoDemo(): Promise<void> {
//   try {
//     await deleteTodo(1);

//     console.log("Todo deleted successfully");
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(
//         "Delete failed:",
//         error.message,
//       );
//     }
//   }
// }

// runDeleteTodoDemo();

console.log("API Base URL:", API_BASE_URL);
