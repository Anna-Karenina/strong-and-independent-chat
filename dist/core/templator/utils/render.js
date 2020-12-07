export const render = (query, component) => {
    const root = document.querySelector(query);
    root && root.appendChild(component.getContent());
    return root;
};
//# sourceMappingURL=render.js.map