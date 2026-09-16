export abstract class BaseProduct {
  constructor(
    public readonly id: number,
    public name: string,
    protected price: number,
  ) {}

  abstract getPrice(): number;

  getDisplayName(): string {
    return `${this.id} - ${this.name}`;
  }
}

export class PhysicalProduct extends BaseProduct {
  override getPrice(): number {
    return this.price;
  }
}

export class DiscountProduct extends BaseProduct {
  constructor(
    id: number,
    name: string,
    price: number,
    private discountRate: number,
  ) {
    super(id, name, price);
  }

  override getPrice(): number {
    return this.price * (1 - this.discountRate);
  }

  override getDisplayName(): string {
    return `[Discount] ${super.getDisplayName()}`;
  }
}
