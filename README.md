# RSSchool NodeJS websocket task template
> Static http server and base task packages.

## Installation
1. Clone/download repo
2. `npm install`

## Usage
**Development**

`npm run start:dev`

* App served @ `http://localhost:8181` with nodemon

**Production**

`npm run start`

* App served @ `http://localhost:8181` without nodemon

## Checking notes

Create .env file
WS_PORT= (port for websocket server)
PORT= (port for http server)
Default values are 8080 for WS, and 3000 for http.


Добавил вэйт на 500 мс перед командами:
draw_* чтобы было легче протестировать
const WAIT_BEFORE_DRAW_MS = 500; в websocket_server/handlers.ts


