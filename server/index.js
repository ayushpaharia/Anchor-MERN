import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import dotenv from "dotenv";
dotenv.config();
import Pusher from "pusher";
import cors from "cors";

// App config
const app = express();
const PORT = process.env.PORT || 5000;
const pusherConfig = {
  appId: process.env.PUSHER_CONFIG_APPID,
  key: process.env.PUSHER_CONFIG_KEY,
  secret: process.env.PUSHER_CONFIG_SECRET,
  cluster: "ap2",
  useTLS: true,
};
const pusher = new Pusher(pusherConfig);

// Middleware
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Header", "*");
//   next();
// });

// DB config
const connectionURL = process.env.DB_CONFIG;
mongoose.connect(connectionURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB CONNECTED!");

  const messageCollection = db.collection("message__contents");
  const changeStream = messageCollection.watch();

  changeStream.on("change", (change) => {
    console.log("Something changed!");
    if (change.operationType === "insert") {
      const { name, message } = change.fullDocument;
      // Trigger
      pusher.trigger("messages", "inserted", {
        name,
        message,
      });
    } else {
      console.log("Error: PUSHER_TRIGGER FAILED!");
    }
  });
});

// Routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) res.status(500).send(err);
    // Internal server error
    else res.status(200).send(data); // no error
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) res.status(500).send(err);
    // Internal server error
    else res.status(201).send(`Message added : \n ${data}`); // Created
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
