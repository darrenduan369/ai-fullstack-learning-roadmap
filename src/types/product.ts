// Product 描述产品目录中每件产品必须具备的数据。
export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    featured: boolean;
    description?: string; // 可选属性，产品描述
    supplier: Readonly<Supplier>;
}

export const STOCK_STATUSES = [
    "in-stock",
    "low-stock",
    "out-of-stock",
] as const;
export type StockStatus = typeof STOCK_STATUSES[number];

export const SORT_DIRECTIONS = [
    "asc",
    "desc",
] as const;
export type SortDirection = typeof SORT_DIRECTIONS[number];

export interface Supplier {
    name: string;
    country: string;
}

export type ProductKey = keyof Product;