export const range = (start, end = null, step = 1, isRight = false) => {
    if (end === null) {
        [start, end] = [0, start];
    }
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    const rangeCount = Math.trunc(Math.abs((max - min) / (step || 1)));
    if (start > end) {
        step = -Math.abs(step);
    }
    const result = new Array(rangeCount).fill('').map((_, i) => start + step * i);
    return isRight ? result.reverse() : result;
};
//# sourceMappingURL=range.js.map