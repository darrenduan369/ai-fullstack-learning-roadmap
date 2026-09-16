export interface Sellable {
  getPrice(): number;
}

export interface StockManageable {
  getStock(): number;
  updateStock(newStock: number): void;
}

export interface PricingStrategy {
  calculate(price: number): number;
}
