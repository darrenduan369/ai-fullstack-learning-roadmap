// Product 描述产品目录中每件产品必须具备的数据。
export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    featured: boolean;
    description?: string; // 可选属性，产品描述
    supplier: Supplier;
}

export type StockStatus =
    | "in-stock"
    | "low-stock"
    | "out-of-stock";

export type SortDirection = "asc" | "desc";

export interface Supplier {
    name: string;
    country: string;
}
