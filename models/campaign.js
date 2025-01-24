const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  image: { type: String },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },  // Track if the campaign is active or completed
});

const campaignModel=mongoose.model("campaigndata",campaignSchema)
module.exports=campaignModel
