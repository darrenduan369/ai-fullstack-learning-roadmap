import { PricingStrategy, Sellable, StockManageable } from "../types/contracts";

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

export class NormalPricing implements PricingStrategy {
  calculate(price: number): number {
    return price;
  }
}

export class DiscountPricing implements PricingStrategy {
  constructor(private rate: number) {}

  calculate(price: number): number {
    return price * (1 - this.rate);
  }
}
