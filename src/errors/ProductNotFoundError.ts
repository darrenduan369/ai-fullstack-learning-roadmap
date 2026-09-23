// ProductNotFoundError.ts
export class ProductNotFoundError extends Error {
  constructor(id: number) {
    super(`Product with id ${id} was not found`);
    this.name = "ProductNotFoundError";
  }
}
