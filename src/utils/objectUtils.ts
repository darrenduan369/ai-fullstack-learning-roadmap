
export function getField<T, K extends keyof T>(
    object: T,
    field: K,
): T[K] {
    return object[field];
}

export function updateField<T extends object, K extends keyof T>(
    object: T,
    key: K,
    value: T[K],
): T {
    return {
        ...object,
        [key]: value,
    };
}