import { products } from "../data/products";
import type { Product, StockStatus, SortDirection, Supplier, ProductChanges, ProductCard} from "../types/product";

export function getFeaturedProducts(products: readonly Product[]): Product[] {
    // 返回所有精选产品
    return products.filter((product) => product.featured);
}

export function getProductsByCategory(
    products: readonly Product[],
    category: string,
): Product[] {
    // 筛选指定 category 的产品
    return products.filter((product) => product.category === category);
}

export function calculateTotalInventoryValue(products: readonly Product[]): number {
    // 计算所有产品的库存总价值
    return products.reduce(
        (sum, product) => sum + product.price * product.stock,
        0,
    );
}

export function getProductById(products: readonly Product[], id: number): Product | undefined {
    // 根据 id 查找产品
    return products.find((product) => product.id === id);
}

export function getProductNames(products: readonly Product[]): string[] {
    // 返回所有产品的名称
    return products.map((product) => product.name)
}

export function getStockStatus(
    product: Readonly<Product>
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
    products: readonly Product[],
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
    product: Readonly<Product>,
    newStock: number,
): Product {
    return {
    ...product,
    stock: newStock
    }
};

export function updateProductStockById(
    products: readonly Product[],
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
    product: Readonly<Product>,
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

export function updateSupplierNameById(
    products: readonly Product[],
    productId: number,
    newSupplierName: string,
): Product[] {
    return products.map((product) => {
        if (product.id === productId) {
            return {
                ...product,
                supplier: {
                    ...product.supplier,
                    name: newSupplierName,
                },
            };
        }

        return product;
    });
}

export function getProductField<K extends keyof Product>(
    product: Readonly<Product>,
    field: K,
): Product[K] {
    return product[field];
}

export function updateProductWithoutSupplier(
    product: Product,
    changes: Partial<Product>,
): Product {
    return {
        ...product,
        ...changes,
    };
}

export function updateSupplier(
    product: Product,
    changes: Partial<Supplier>,
): Product {
    return {
        ...product,
        supplier: {
            ...product.supplier,
            ...changes,
        },
    };
}

export function updateProduct(
    product: Product,
    changes: ProductChanges,
): Product {
    return {
        ...product,
        ...changes,

        supplier: changes.supplier
            ? {
                  ...product.supplier,
                  ...changes.supplier,
              }
            : product.supplier,
    };
}

export function toProductCard(
    product: Product,
): ProductCard {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        featured: product.featured,
    };
}

export function toProductCards(
    products: readonly Product[],
): ProductCard[] {
    return products.map(toProductCard);
}

export function countProductsByCategory(
    products: readonly Product[],
): Record<string, number> {
    return products.reduce<Record<string, number>>(
        (counts, product) => {
        counts[product.category] = (counts[product.category] ?? 0) + 1;
        return counts;
        }, 
        {}
    );
}

export function createProductMap(
    products: readonly Product[],
): Partial<Record<number, Product>> {
    return products.reduce<Partial<Record<number, Product>>>(
        (map, product) => {
            map[product.id] = product;
            return map;
        },
        {}
    );
}
