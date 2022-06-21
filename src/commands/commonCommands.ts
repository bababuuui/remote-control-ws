import robot from "robotjs";
import { Coordinate } from "../types";

export const getCurrentMousePosition = (): Coordinate => {
  return robot.getMousePos();
};
