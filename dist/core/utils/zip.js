export const zip = (l, r) => {
    const zipped = [];
    const count = Math.max(l.length, r.length);
    for (let i = 0; i < count; i++) {
        zipped.push([l[i], r[i]]);
    }
    return zipped;
};
//# sourceMappingURL=zip.js.map