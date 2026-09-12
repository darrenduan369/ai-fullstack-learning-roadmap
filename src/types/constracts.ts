export interface Sellable {
  getPrice(): number;
}

export interface StockManageable {
  getStock(): number;
  updateStock(newStock: number): void;
}
