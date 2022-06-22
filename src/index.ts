import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { httpServer } from "./http_server";
import { wsConnectionHandler } from "./websocket_server/handlers";

dotenv.config();
const HTTP_PORT = process.env.PORT || 3000;
const WS_PORT = parseInt(process.env.WS_PORT) || 8080;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WS_PORT });
console.log(`Websocket server started on ${WS_PORT} port`);

wss.on("connection", wsConnectionHandler);
