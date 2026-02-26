import express from "express";
import {
  getAllEmails,
  createEmail,
  getEmailById,
  updateEmail,
  deleteEmail,
  generateEmail,
  sendEmailAction,
} from "../controllers/emailController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { getEmailStats } from "../controllers/emailController.js";
import { getRecentActivity } from "../controllers/emailController.js";
const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);
router.get("/stats", getEmailStats);

// GET /api/email - Get all emails
router.get("/", getAllEmails);

// POST /api/email/generate - Generate email with AI (protected)
router.post("/generate", generateEmail);

// POST /api/email/send - Send email (protected)
router.post("/send", sendEmailAction);


// POST /api/email - Create new email
router.post("/", createEmail);
router.get("/activity", getRecentActivity);
// GET /api/email/:id - Get single email
router.get("/:id", getEmailById);

// PUT /api/email/:id - Update email
router.put("/:id", updateEmail);

// DELETE /api/email/:id - Delete email
router.delete("/:id", deleteEmail);

export default router;

