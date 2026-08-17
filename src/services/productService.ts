import { products } from "../data/products";
import type { Product, StockStatus, SortDirection} from "../types/product";

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

export function getProductById(products: Product[], id: number): Product | undefined {
    // 根据 id 查找产品
    return products.find((product) => product.id === id);
}

export function getProductNames(products: Product[]): string[] {
    // 返回所有产品的名称
    return products.map((product) => product.name)
}

export function getStockStatus(
    product: Product
    ): StockStatus {
        if (product.stock === 0) {
            return "out-of-stock";
        } else if (product.stock <= 5) {
            return "low-stock";
        } else {
            return "in-stock";
        }
    }

export function sortProductsByPrice(
    products: Product[],
    // 默认升序
    direction: SortDirection = "asc"
): Product[] {
    // 复制数组后再排序，避免修改传入的原始数组
    return [...products].sort((a, b) => {
        if (direction === "asc") {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
}

export function updateProductStock(
    product: Product,
    newStock: number,
): Product {
    return {
    ...product,
    stock: newStock
    }
};

export function updateProductStockById(
    products: Product[],
    productId: number,
    newStock: number,
): Product[] {
    return products.map((product) => {
        if (product.id === productId) {
            return {
                ...product,
                stock: newStock,
            };
        }

        return product;
    });
};

export function updateSupplierName(
    product: Product,
    newSupplierName: string,
): Product {
    return {
        ...product,
        supplier: {
            ...product.supplier,
            name: newSupplierName,
        },
    }
}