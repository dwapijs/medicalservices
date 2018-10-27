import app from "./app";

const server = app.listen(3000, () => console.log("app running http://localhost:3000"));

export default server;
