export type Dictionary<Key extends keyof any, Value> = {
    [key in Key]: Value;
};

/**
 * Guard function to check if an object conforms to the Dictionary type.
 * @param obj - The object to be checked.
 * @returns True if the object conforms to the Dictionary type, false otherwise.
 */
export function isDictionary<Key extends keyof any, Value>(obj: any): obj is Dictionary<Key, Value> {
    if (typeof obj !== "object" || obj === null) {
        return false;
    }

    const keys = Object.keys(obj);
    for (const key of keys) {
        if (!(key in obj)) {
            return false;
        }
    }

    return true;
}
