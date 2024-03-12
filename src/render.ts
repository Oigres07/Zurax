import { Configuration } from './types';

export function zurax(type: string | Function, props: { [key: string]: string | EventListenerOrEventListenerObject | null }, ...args: (string | { type: typeof type; props: typeof props; children: typeof args })[]) {
  const children = Array().concat(...args) as typeof args;

  return { type, props, children };
}

export function render(node: ReturnType<typeof zurax>, confg?: Configuration) {
  if (typeof node.type === 'function') {
    const result = node.type(node.props);

    return render(result, confg);
  }

  if (confg?.plugins?.length) {
    confg.plugins.forEach(plug => plug(node));
  }

  const element = document.createElement(node.type);

  node.children.forEach(child => {
    if (typeof child === 'string') element.appendChild(document.createTextNode(child));
    else element.appendChild(render(child, confg));
  });

  if (node.props) {
    Object.keys(node.props).forEach(key => {
      if (key.startsWith('on')) {
        const event = key.slice(2);

        return element.addEventListener(event, node.props![key] as EventListenerOrEventListenerObject);
      }

      return element.setAttribute(key, node.props![key] as string);
    });
  }

  return element;
}
