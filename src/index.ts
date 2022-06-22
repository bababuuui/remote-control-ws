import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { httpServer } from "./http_server";
import { wsConnectionHandler } from "./websocket_server/handlers";

dotenv.config();
const HTTP_PORT = process.env.PORT || 3000;
const WS_PORT = parseInt(process.env.WS_PORT) || 8080;
// for testing purposes. Waits ${ms} before drawing object.
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WS_PORT });

wss.on("connection", wsConnectionHandler);
