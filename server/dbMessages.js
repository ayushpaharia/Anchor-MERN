import mongoose from "mongoose";

const anchorSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  recieved: Boolean,
});

export default mongoose.model("message__contents", anchorSchema);
