# Zurax

A Virtual DOM application.

## Instalation

```bash
npm install zurax
```

## Usage

For the usage of the package, two files are required:

`index.html`

```html
<html lang="en">
  <head> </head>
  <body>
    <script src="src/main.jsx" type="module"></script>
  </body>
</html>
```

`src/main.jsx`

```jsx
/** @jsx zurax */

import { zurax, render } from 'zurax';

const App = ({ title }) => <h1>{title}</h1>;

document.body.appendChild(render(<App title='Your application!' />));
```
