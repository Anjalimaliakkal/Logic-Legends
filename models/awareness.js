// models/UserIdea.js
const mongoose = require('mongoose');

const awarenessSchema = new mongoose.Schema({
  ideaTitle: { type: String, required: true },
  ideaDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },  // Idea status
});

const awarenessModel=mongoose.model("awarenessdata",awarenessSchema)
module.exports=awarenessModel

