import { fetchProducts } from "../api";

import {
  getRequiredProductById,
  getProductResultById,
} from "../services/productService";

import type { ApiError, Product, RequestState, Result } from "../types";
import { ProductQuery } from "../types/product";

// Retrieves featured products.
export async function runProductApiDemo(): Promise<void> {
  const featuredProducts = await fetchProducts({
    featured: true,
  });

  console.log("Featured products:", featuredProducts.length);

  const product = await getRequiredProductById(1);

  console.log("Product:", product.name);
}

// Retrieves a product by ID, returning a Result type that encapsulates either the product or an ApiError.
export async function runProductResultDemo(): Promise<void> {
  const successResult = await getProductResultById(1);

  console.log("Success result:", successResult);

  const failedResult = await getProductResultById(999);

  console.log("Failed result:", failedResult);
}

function productResultToState(
  result: Result<Product, ApiError>,
): RequestState<Product> {
  if (result.ok) {
    return {
      status: "success",
      data: result.data,
    };
  }

  if (result.error.code === "NOT_FOUND") {
    return {
      status: "empty",
    };
  }

  return {
    status: "error",
    message: result.error.message,
  };
}

/* 
    Converts a Result<Product, ApiError> to a RequestState<Product>, 
    mapping success to "success", NOT_FOUND errors to "empty", and other errors to "error".
*/
async function loadProductState(id: number): Promise<RequestState<Product>> {
  const result = await getProductResultById(id);

  return productResultToState(result);
}

export async function runProductStateDemo(): Promise<void> {
  let state: RequestState<Product> = {
    status: "loading",
  };

  console.log("Initial state:", state);

  state = await loadProductState(1);

  console.log("Loaded state:", state);

  state = {
    status: "loading",
  };

  state = await loadProductState(999);

  console.log("Missing product state:", state);
}

// Retrieves a list of products, optionally filtered by category and featured status.
async function loadProductListState(
  query?: ProductQuery,
): Promise<RequestState<Product[]>> {
  try {
    const products = await fetchProducts(query);

    if (products.length === 0) {
      return {
        status: "empty",
      };
    }

    return {
      status: "success",
      data: products,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function runProductListStateDemo(): Promise<void> {
  let state: RequestState<Product[]> = {
    status: "loading",
  };

  console.log("List initial state:", state);

  state = await loadProductListState({
    featured: true,
  });

  console.dir(state, {
    depth: null,
  });

  console.log("Test empty products state:-----------------------");
  state = {
    status: "loading",
  };

  state = await loadProductListState({
    minPrice: 999999,
  });

  console.log("Empty products state:", state);
}
