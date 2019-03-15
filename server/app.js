const Koa = require("koa");
const route = require("koa-route");
const webSocket = require("koa-websocket");
const msg_pack = require("msgpack-lite");
const app = webSocket(new Koa());
const PORT = 9000;

app.ws.use((ctx, next) => {
  return next(ctx);
});

// ctx.websocket.on接收客户端的消息;
// ctx.websocket.send向客户端发送消息。

app.ws.use(
  route.all("/", ctx => {
    ctx.websocket.on('message', (message) => {
      ctx.websocket.send(`${message}_这是服务端返给你的！`);
    });
  })
);

app.listen(PORT);

console.info(`app webSocket server is running at ${PORT} port.`);