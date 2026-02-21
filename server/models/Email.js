import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
    },
    purpose: {
      type: String,
    },
    tone: {
      type: String,
    },
    recipient: {
      type: String,
    },
    keyPoints: {
      type: [String],
      default: [],
    },
    generatedContent: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "final"],
      default: "draft",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: false, // We're handling createdAt and updatedAt manually
  }
);

// Update updatedAt before saving
emailSchema.pre("save", function () {
    if (!this.isNew) {
      this.updatedAt = Date.now();
    }
  });
  

const Email = mongoose.model("Email", emailSchema);

export default Email;

