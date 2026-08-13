import type { Product } from "../types/product";

export function getFeaturedProducts(products: Product[]): Product[] {
    // 返回所有精选产品
    return products.filter((product) => product.featured);
}

export function getProductsByCategory(
    products: Product[],
    category: string,
): Product[] {
    // 筛选指定 category 的产品
    return products.filter((product) => product.category === category);
}

export function calculateTotalInventoryValue(products: Product[]): number {
    // 计算所有产品的库存总价值
    return products.reduce(
        (sum, product) => sum + product.price * product.stock,
        0,
    );
}
