import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";

export const httpServer = http.createServer((req: IncomingMessage, res: ServerResponse): void => {
  const dirname = path.resolve(path.dirname(""));
  const filePath = dirname + (req.url === "/" ? "/front/index.html" : `/front${req.url}`);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});
