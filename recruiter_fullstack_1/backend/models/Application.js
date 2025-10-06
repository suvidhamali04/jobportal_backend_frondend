const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: { type: String },
  coverLetter: { type: String },
  status: { type: String, enum: ['applied','shortlisted','rejected','hired'], default: 'applied' },
  appliedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Application', applicationSchema);
