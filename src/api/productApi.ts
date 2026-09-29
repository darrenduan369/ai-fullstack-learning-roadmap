import { Product, ProductQuery } from "../types/product";
import { products } from "../data/products";

export async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data: unknown = await response.json();

  return data;
}

// Fetches products from the mock data source, applying optional filters based on the provided query parameters.
export async function fetchProducts(query?: ProductQuery): Promise<Product[]> {
  let result = [...products];

  if (query?.category !== undefined) {
    result = result.filter((product) => product.category === query.category);
  }

  if (query?.featured !== undefined) {
    result = result.filter((product) => product.featured === query.featured);
  }

  if (query?.minPrice !== undefined) {
    const minPrice = query.minPrice;
    result = result.filter((product) => product.price >= minPrice);
  }

  return result;
}

export async function fetchProductById(
  id: number,
): Promise<Product | undefined> {
  return products.find((product) => product.id === id);
}
