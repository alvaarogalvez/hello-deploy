1. Creamos el repositorio local.

```bash
git init
git add .
git commit -m "build"
```

2. Subimos el repo a github

```bash
gh repo create
gh repo list
```

3. Creamos una app para desplegar

```bash
npm i express
npm install express
```

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
```

4. Añadimos `node_modules` al `.gitignore`
5. Testeamos si la app funciona

```bash
node server.js
curl localhost:3000
```