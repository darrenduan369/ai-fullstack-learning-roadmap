import { Sellable, StockManageable } from "../types/constracts";

export class ProductEntity implements Sellable, StockManageable {
  constructor(
    public readonly id: number,
    public name: string,
    public price: number,
    private stock: number,
  ) {}

  getPrice(): number {
    return this.price;
  }

  getStock(): number {
    return this.stock;
  }

  updateStock(newStock: number): void {
    if (newStock < 0) {
      throw new Error("Stock cannot be negative");
    }

    this.stock = newStock;
  }
}
