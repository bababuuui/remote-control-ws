import { Duplex } from "stream";
import robot from "robotjs";
import { createWebSocketStream, WebSocket } from "ws";
import { getCurrentMousePosition } from "../commands/commonCommands";
import { waitForMs } from "../utils/waitUtils";
import { drawCircle, drawRectangle } from "../commands/drawCommands";
import { takeScreenshot } from "../utils/screenshotUtils";

const WAIT_BEFORE_DRAW_MS = 500;
async function wsMessageHandler(wsStream: Duplex, data: any) {
  console.log("received: %s", data);
  const [command, ...args] = data.toString().split(" ");
  const { x, y } = getCurrentMousePosition();
  console.log(`Current mouse position: ${x} , ${y}`);
  let webSocketResponse = command;
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
      webSocketResponse = `mouse_position ${x},${y}`;
      break;
    case "draw_circle":
      await waitForMs(WAIT_BEFORE_DRAW_MS);
      drawCircle(parseInt(args[0]));
      break;
    case "draw_rectangle":
      await waitForMs(WAIT_BEFORE_DRAW_MS);
      const width = parseInt(args[0]);
      const length = parseInt(args[1]);
      drawRectangle(width, length);
      break;
    case "draw_square":
      await waitForMs(WAIT_BEFORE_DRAW_MS);
      drawRectangle(parseInt(args[0]), parseInt(args[0]));
      break;
    case "prnt_scrn":
      const base64Screenshot = takeScreenshot(x, y, 200, 200);
      webSocketResponse = `prnt_scrn ${base64Screenshot}`;
      break;
    default:
  }
  wsStream.write(`${webSocketResponse} \0`);
}

export async function wsConnectionHandler(ws: WebSocket) {
  console.log("Connection started");
  const wsStream: Duplex = createWebSocketStream(ws, { decodeStrings: false });
  wsStream.on("data", async (data) => {
    await wsMessageHandler(wsStream, data);
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });

  process.on("SIGINT", () => {
    ws.close();
  });
}
