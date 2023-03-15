export function isStringsArray(arr: any): arr is string[] {
    return Array.isArray(arr) && arr.every(i => typeof i === "string")
}