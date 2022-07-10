import robot from "robotjs";
import { getCurrentMousePosition } from "./commonCommands";

export const drawRectangle = (width: number, length: number) => {
  let { x, y } = getCurrentMousePosition();
  robot.setMouseDelay(500);
  x += width;
  robot.mouseToggle("down");
  robot.dragMouse(x, y);
  y += length;
  robot.dragMouse(x, y);
  x -= width;
  robot.dragMouse(x, y);
  y -= length;
  robot.dragMouse(x, y);
  robot.mouseToggle("up");
};

export const drawCircle = (radius) => {
  const initialCord = getCurrentMousePosition();
  robot.setMouseDelay(5);
  const startX = initialCord.x + radius * Math.cos(0);
  const startY = initialCord.y + radius * Math.sin(0);
  robot.moveMouse(startX, startY);
  robot.mouseToggle("down");
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = initialCord.x + radius * Math.cos(i);
    const y = initialCord.y + radius * Math.sin(i);
    robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
};
