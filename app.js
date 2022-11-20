const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // index page
  // if (req.url === "/") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "index.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  // }
  // about page
  // if (req.url === "/about") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "about.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  // }
  // API
  // if (req.url === "/api/users") {
  //   const users = [
  //     {
  //       name: "inon bar",
  //       age: 34,
  //     },
  //     {
  //       name: "yaron veg",
  //       age: 33,
  //     },
  //     {
  //       name: "mali riham",
  //       age: 36,
  //     },
  //   ];
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(users));
  // }

  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of file
  let extName = path.extname(filePath);

  // initial content type
  let ContentType = "text/html";

  // check ext and set content type
  switch (extName) {
    case ".js":
      ContentType = "text/javascript";
      break;
    case ".css":
      ContentType = "text/css";
      break;
    case ".json":
      ContentType = "application/json";
      break;
    case ".png":
      ContentType = "image/png";
      break;
    case ".jpeg":
      ContentType = "image/jpeg";
      break;
  }

  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // page not found
        fs.readFile(
          path.join(__dirname, "public", "pageNotFound.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // probably some server error
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`Server Error ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": ContentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
