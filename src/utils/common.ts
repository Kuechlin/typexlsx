export function maxBy<T>(values: T[], fn: (val: T, i: number) => number) {
    let max = 0;
    for (let i = 0; i < values.length; i++) {
        const next = fn(values[i], i);
        if (next > max) {
            max = next;
        }
    }
    return max;
}
