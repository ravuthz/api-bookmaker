import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export default mongoose.model("Post", schema);