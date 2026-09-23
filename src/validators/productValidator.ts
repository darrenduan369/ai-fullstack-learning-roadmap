import type { Product } from "../types/product";
import { ProductValidationError } from "../errors";

export function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return "id" in value && "name" in value && "price" in value;
}

export function assertIsProduct(value: unknown): asserts value is Product {
  if (!isProduct(value)) {
    throw new ProductValidationError("Invalid product data");
  }
}
