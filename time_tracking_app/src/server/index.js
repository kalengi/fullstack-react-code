const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
//const os = require("os");
//const fetch = require("node-fetch");

const app = express();

const DATA_FILE = path.join(__dirname, "./data/data.json");

const PORT = 8000;

//app.use(express.static("dist"));
//let staticFilesPath = path.join(__dirname, "../../public");
let staticFilesPath = path.join(__dirname, "../client/build");
app.use("/", express.static(staticFilesPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.get("/", (req, res) => {
  //debugger;

  let indexHtmlPath = path.join(staticFilesPath, "/index.html");
  res.sendFile(indexHtmlPath, function(error) {
    if (error) {
      //debugger;

      let errorMessage = `The index file could not be served: ${error.message}`;
      console.log(errorMessage);
      return res.status(500).json({ message: errorMessage });
    }
  });
});

app.post("/api/check-auth", async (req, res) => {
  res.json({ user: "Admin" });
});

app.get("/api/timers", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(data));
  });
});

app.post("/api/timers", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const timers = JSON.parse(data);
    const newTimer = {
      title: req.body.title,
      project: req.body.project,
      id: req.body.id,
      elapsed: 0,
      runningSince: null
    };
    timers.push(newTimer);
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
      res.setHeader("Cache-Control", "no-cache");
      res.json(timers);
    });
  });
});

app.post("/api/timers/start", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const timers = JSON.parse(data);
    timers.forEach(timer => {
      if (timer.id === req.body.id) {
        timer.runningSince = req.body.start;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
      res.json({});
    });
  });
});

app.post("/api/timers/stop", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const timers = JSON.parse(data);
    timers.forEach(timer => {
      if (timer.id === req.body.id) {
        const delta = req.body.stop - timer.runningSince;
        timer.elapsed += delta;
        timer.runningSince = null;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
      res.json({});
    });
  });
});

app.put("/api/timers", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const timers = JSON.parse(data);
    timers.forEach(timer => {
      if (timer.id === req.body.id) {
        timer.title = req.body.title;
        timer.project = req.body.project;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
      res.json({});
    });
  });
});

app.delete("/api/timers", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    let timers = JSON.parse(data);
    timers = timers.reduce((memo, timer) => {
      if (timer.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(timer);
      }
    }, []);
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
      res.json({});
    });
  });
});

app.get("/molasses", (_, res) => {
  setTimeout(() => {
    res.end();
  }, 5000);
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
