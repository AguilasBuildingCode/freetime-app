// Generic function with filtering and transformation
export function transformMapToList<K, V, T>(
    map: Map<K, V>,
    options: {
        filter?: (key: K, value: V) => boolean;
        transform: (key: K, value: V) => T;
    }
): T[] {
    return Array.from(map.entries()).reduce((acc, [key, value]) => {
        // Apply filter if provided
        if (options.filter && !options.filter(key, value)) {
            return acc;
        }

        // Apply transformation
        acc.push(options.transform(key, value));
        return acc;
    }, [] as T[]);
}