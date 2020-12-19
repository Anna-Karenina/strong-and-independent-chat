export const render = (query: string, component: any): Element | null => {
  const root = document.querySelector(query);
  root && root.appendChild(component.getContent());
  return root;
};