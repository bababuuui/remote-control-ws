import robot from "robotjs";
import Jimp from "jimp";

/**
 * @returns base64 screenshot
 */
export const takeScreenshot = (x, y, width, height): string => {
  let base64String = "";
  try {
    const rimg = robot.screen.capture(x, y, width, height);
    for (let i = 0; i < rimg.image.length; i++) {
      if (i % 4 === 0) {
        [rimg.image[i], rimg.image[i + 2]] = [rimg.image[i + 2], rimg.image[i]];
      }
    }
    const jimg = new Jimp(rimg.width, rimg.height);
    jimg.bitmap.data = rimg.image;
    jimg.getBuffer(Jimp.MIME_PNG, (err, result) => {
      base64String = result.toString("base64");
    });
  } catch (e) {
    console.error(e);
  }
  return base64String;
};
