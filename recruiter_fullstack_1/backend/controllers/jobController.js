const Job = require('../models/Job');
exports.createJob = async (req, res) => {
  try {
    const data = req.body;
    data.createdBy = req.user._id;
    const job = await Job.create(data);
    res.status(201).json(job);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const q = req.query.q || '';
    const location = req.query.location;
    const company = req.query.company;
    const skip = (page - 1) * limit;

    const filter = { isActive: true };
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { company: { $regex: q, $options: 'i' } }
      ];
    }
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (company) filter.company = { $regex: company, $options: 'i' };

    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json({ total, page, pages: Math.ceil(total/limit), jobs });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job removed' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
