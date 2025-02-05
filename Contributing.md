<p align="center">
    <img width=200 height=200 src="./public/img/new-donate-gifts-logo-2.png">
</p>

### This is a short guide on how to setup a working dev environment.

If you have additional questions reach out to us on our [Discord](https://discord.gg/Y6EWDX4vtM)

---

## Contributing

In general, we follow the "fork-and-pull" Git workflow.

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## Prerequisites

- Ensure that you use the correct node version, we are using v18
    - `nvm use` if you have nvm installed
    - download from the official [node page](https://nodejs.org/en/download)


- Have Docker installed (Docker Desktop for mac and windows). The local database is running in a mongo docker container so that you don't have to run mongo natively

## Install dependencies

- `npm install` will install all the deps you need as well as setup husky for our hook scripts

## Running all the things

Must do first:

- copy `example-config.env` file and rename it to `config.env`

There are several scripts that can be executed to run/build the project/assets, the ones listed below are what you will be using most of the time.

- `docker-compose up`: starts the mongo db container 
(leave it running and open a new terminal for npm commands)
- `npm run dev`: this will start the server as well as the webpack watcher for react
- `npm run build`: will cleanup all generated files and afterwards build all the assets/js into minified versions
- To seed the database you can execute the seeder.js file like so `node scripts/seeder.js`

If you need to run something specific checkout the package.json scripts section

## Hooks and styling

We have a pre commit hook running which runs our linters before you make a commit to ensure the styling guidelines are met. The same hooks run on github when you create a pull request so that no one can just skip the hooks.

## Project structure and tech stack

### Our tech stack:
- Server: [express.js](https://expressjs.com/) with [Typescript](https://www.typescriptlang.org/)
- Template engine: [pug.js](https://pugjs.org/api/getting-started.html)
- Our new components: [react.js](https://react.dev/)
- Our current database: [mongodb](https://www.mongodb.com)
---

Everything styling related is found in the design directory

We use bootstrap 5 as our css framework and build our assets with gulp

---
```
js/
├── react/
│   └── components/
│       └── [componentname]/
│           ├── ...
│           └── Main.jsx
```
### The react folder
We are not using [next.js](https://nextjs.org/) or [create-react-app](https://create-react-app.dev/), instead we mount our components per view since the addition of react is fairly recent and we initially started with a template engine.
```js
$(document).ready(function () {
    const root = ReactRoot(document.getElementById('react-bundle-root'));
    root.render(
        React.createElement(
            WishCards,
            {}
        )
    );
}) 
```
Every component has its own folder inside the components and will be added to the `window` in [bundle.jsx](/js/react/bundle.jsx) object so that it is available in the templates.
```js
import { createRoot } from 'react-dom/client';
import React from 'react';

import WishCards from './components/wishcards/Main.jsx';

window.ReactRoot = createRoot;
window.React = React;

window.WishCards = WishCards;
```
Everything related to the component should also be inside of the specific folder unless it's something that can be used in multiple components (e.g. a custom button or form input).

### The app folder
This one has all the remaining js files that will be used. For now it's not present since all the client side JS is in the templates included but the option to separate it is available with this directory.
```
js/
└── app/
    └── ...
```
### API
This route is meant to be used together with ajax calls/react components. Routes in this directory are only meant to return `JSON` objects. They are mounted and accessible on `/api/<filename>` and should always have the view name as filename if they are used in a single template/react component.

### Routes
Each route in this directory is meant to render a page and not just return data. If you only need data fetching to fill a template, use an ajax call from the [api](/src/api/). The filename needs to represent the route of the view.

### Views
Our [pug](https://pugjs.org/api/getting-started.html) templates.
