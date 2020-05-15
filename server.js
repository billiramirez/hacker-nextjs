const next = require("next");
const http = require("http");
const url = require("url");
const path = require("path");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      // Parse requested url to get the pathname

      const parsedUrl = url.parse(req.url, true);
      const { pathname } = parsedUrl;

      // if a service worker requested, serve it as a static file

      if (pathname === "/service-worker.js") {
        const filePath = path.join(__dirname, ".next", pathname);
        console.log(filePath);
        app.serveStatic(req, res, filePath);
      } else {
        // otherwise let's next take care
        handle(req, res, parsedUrl);
      }
    })
    .listen(PORT, () => {
      console.log("listening on port ", PORT);
    });
});
