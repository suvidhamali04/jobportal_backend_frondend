const Application = require('../models/Application');
exports.apply = async (req, res) => {
  try {
    const { jobId, job, resumeUrl, coverLetter } = req.body;
    const jobIdFinal = jobId || job;
    const exists = await Application.findOne({ job: jobIdFinal, applicant: req.user._id });
    if (exists) return res.status(400).json({ message: 'Already applied' });
    const app = await Application.create({ job: jobIdFinal, applicant: req.user._id, resumeUrl, coverLetter });
    res.status(201).json(app);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getApplicationsForUser = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user._id }).populate('job');
    res.json(apps);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getApplicationsForJob = async (req, res) => {
  try {
    const apps = await Application.find({ job: req.params.jobId }).populate('applicant', '-password');
    res.json(apps);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(app);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // For local files, provide a URL path to access it
    const resumeUrl = `/uploads/${req.file.filename}`; 

    res.json({ resumeUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

