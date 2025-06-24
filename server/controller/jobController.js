const Jobs = require("../models/Job");

const addJob = async (req, res) => {
  try {
    const job = new Jobs({ ...req.body, postedBy: req.user._id });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listJob = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    //calculate skip value
    const skip = (page - 1) * limit;

    //fetch jobs with pagination
    const jobs = await Jobs.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    //get total count for pagiantion info
    const total = await Jobs.countDocuments();

    res.json({
      jobs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//show only the user didnt apply jobs
const applied = async (req, res) => {
  try {
    const userId = req.user._id;

    const appliedJobs = await Jobs.find({
      "applications.applicant": userId,
    }).sort({ createdAt: -1 });

    res.json(appliedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//show only user applied Jobs
const unapply = async (req, res) => {
  try {
    const userId = req.user._id;

    const jobs = await Jobs.find({
      "applications.applicant": { $ne: userId }, // User not in applications
      isActive: true,
    });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;

    const job = await Jobs.findById(jobId);

    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if already applied
    const alreadyApplied = job.applications.find(
      (app) => app.applicant.toString() === req.user._id.toString()
    );
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You already applied for this job" });
    }
    // Add application
    job.applications.push({ applicant: req.user._id });
    await job.save();

    res.status(201).json({ message: "Application submitted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addJob,
  editJob,
  listJob,
  applyJob,
  applied,
  unapply,
};
