import Koa = require("koa");

const app = new Koa();

app.use(ctx => {
    ctx.body = "Hello world";
});

app.listen(3000, () => console.log("app running http://localhost:3000"));
