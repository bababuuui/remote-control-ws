import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import robot from "robotjs";
import { httpServer } from "./http_server";
import { getCurrentMousePosition } from "./commands/commonCommands";
import { drawCircle, drawRectangle } from "./commands/drawCommands";
import { waitForMs } from "./utils/waitUtils";
import { takeScreenshot } from "./utils/screenshotUtils";

dotenv.config();
const HTTP_PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

// TODO streams api

// todo  close connection?

// TODO refactoring

const wss = new WebSocketServer({ port: WS_PORT });

wss.on("connection", async function connection(ws) {
  ws.on("message", async function message(data) {
    const [command, ...args] = data.toString().split(" ");
    const { x, y } = getCurrentMousePosition();
    console.log(x, y);
    switch (command) {
      case "mouse_up":
        robot.moveMouse(x, y - parseInt(args[0]));
        break;
      case "mouse_down":
        robot.moveMouse(x, y + parseInt(args[0]));
        break;
      case "mouse_left":
        robot.moveMouse(x - parseInt(args[0]), y);
        break;
      case "mouse_right":
        robot.moveMouse(x + parseInt(args[0]), y);
        break;
      case "mouse_position":
        console.log(x, y);
        ws.send(`mouse_position ${x},${y}`);
        break;
      case "draw_circle":
        await waitForMs(1000);
        drawCircle(parseInt(args[0]));
        break;
      case "draw_rectangle":
        await waitForMs(1000);
        const width = parseInt(args[0]);
        const length = parseInt(args[1]);
        drawRectangle(width, length);
        break;
      case "draw_square":
        await waitForMs(1000);
        drawRectangle(parseInt(args[0]), parseInt(args[0]));
        break;

      case "prnt_scrn":
        const base64Screenshot = takeScreenshot(x, y, 100, 100);
        ws.send(`prnt_scrn ${base64Screenshot}`);
        break;
      default:
      // ws.send("default");
    }
    console.log("received: %s", data);
  });

  process.on("SIGINT", () => {
    ws.close();
  });
});
