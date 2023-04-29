const express = require('express')
const cors = require('cors')
const path = require("path")
const app = express()
const bodyParser = require("body-parser")
const db = require('./db')
const PORT = process.env.PORT || 8081
const router = require('./routers')

//db connections

db.connect();

//middleware
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));

app.use(express.json());

//cors headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

//api
app.use("/api", router);


//static resources
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/dist")));

app.get("*", (req, res) => {
    try {
      res.sendFile(path.join(`${__dirname}/../frontend/dist/index.html`));
    } catch (e) {
      res.send("error occured");
    }
});

//cors
app.use(cors());

//server listen
app.listen(PORT, () => {
  console.log(`Raichu Login is running on PORT No- ${PORT}`);
});