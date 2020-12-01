export const render = (query, component) => {
  const root = document.querySelector(query);
  root.appendChild(component.getContent());
  return root;
};