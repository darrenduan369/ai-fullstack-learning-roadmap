// Product 描述产品目录中每件产品必须具备的数据。
export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    featured: boolean;
}
