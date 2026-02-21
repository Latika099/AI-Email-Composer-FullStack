import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
    },
    type: {
      type: String,
    },
    length: {
      type: String,
    },
    keywords: {
      type: String,
    },
    generatedContent: {
      type: String,
      required: true
    }
    ,
  },
  {
    timestamps: true,
  }
);

const Email = mongoose.model("Email", emailSchema);

export default Email;