import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";

const PAGE_SIZE = 5;

const Jobs = () => {
  const [jobs, setJobs] = useState([]); //holding current list of jobs
  const [showModal, setShowModal] = useState(false); //control add /edit modal visible
  const [editJob, setEditJob] = useState(null); // state to edit model
  const [currentPage, setCurrentPage] = useState(1); //state for pagination

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / PAGE_SIZE);
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Jobs data", res.data.jobs);
        setJobs(res.data.jobs);
      } catch (error) {
        console.log("Failed to fetch Jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleAdd = () => {
    setEditJob(null);
    setShowModal(true);
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setShowModal(true);
  };

  const handleSave = (savedJob) => {
    if (editJob) {
      setJobs(jobs.map((j) => (j.id === savedJob.id ? savedJob : j)));
    } else {
      setJobs([...jobs, savedJob]);
    }
    setShowModal(false);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Manage Jobs</h2>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Job
          </button>
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.map((job) => (
              <tr key={job.id}>
                <td className="border px-4 py-2">{job.title}</td>
                <td className="border px-4 py-2">{job.company}</td>
                <td className="border px-4 py-2">{job.location}</td>
                <td className="border px-4 py-2">{job.jobType}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>

                  {/* Add Delete button if needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        {/* Modal for Add/Edit */}
        {showModal && (
          <JobModal
            job={editJob}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

// Modal component for Add/Edit
const JobModal = ({ job, onClose, onSave }) => {
  const [form, setForm] = useState(
    job || {
      title: "",
      company: "",
      description: "",
      requirements: "",
      location: "",
      type: "",
      salary: " ",
      experienceLevel: "",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert requirements textarea to array
    const requirementsArray =
      typeof form.requirements === "string"
        ? form.requirements
            .split("\n")
            .map((r) => r.trim())
            .filter((r) => r)
        : Array.isArray(form.requirements)
        ? form.requirements.map((r) => r.trim()).filter((r) => r)
        : [];

    // Combine salary fields
    const salary = {
      min: form.salaryMin ? Number(form.salaryMin) : undefined,
      max: form.salaryMax ? Number(form.salaryMax) : undefined,
      currency: form.salaryCurrency || "USD",
    };

    // Build the job object to save
    const jobData = {
      ...form,
      requirements: requirementsArray,
      salary,
    };

    // Remove temporary fields from jobData if needed
    delete jobData.salaryMin;
    delete jobData.salaryMax;
    delete jobData.salaryCurrency;

    try {
      let response;
      const token = localStorage.getItem("token");
      console.log("token", token);
      if (job) {
        //edit job

        response = await axios.put(
          `http://localhost:5001/api/jobs/${job._id}`,
          jobData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //setJobs(jobs.map((j) => (j.id === job.id ? response.data : j)));
      } else {
        //add mew job
        response = await axios.post("http://localhost:5001/api/jobs", jobData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setJobs([...jobs, response.data]);
      }
      onSave(response.data); // Pass the new/updated job to parent
      onClose();
    } catch (error) {
      console.log("Internal server Error", error);
      alert(
        "Error saving job: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h3 className="text-xl font-bold mb-4">
          {job ? "Edit Job" : "Add Job"}
        </h3>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full mb-2 p-2 border rounded"
          rows={4}
          required
        />
        <textarea
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          placeholder="Enter one requirement per line"
          className="w-full mb-2 p-2 border rounded"
          rows={4}
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          placeholder="Type (Full-Time, Part-Time, etc)"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <select
          name="experienceLevel"
          value={form.experienceLevel}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        >
          <option value="entry">Entry</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
          <option value="executive">Executive</option>
        </select>

        <input
          type="number"
          name="salaryMin"
          value={form.salaryMin}
          onChange={handleChange}
          placeholder="Min"
          className="w-1/3 p-2 border rounded"
          min="0"
        />
        <input
          type="number"
          name="salaryMax"
          value={form.salaryMax}
          onChange={handleChange}
          placeholder="Max"
          className="w-1/3 p-2 border rounded"
          min="0"
        />
        <select
          name="salaryCurrency"
          value={form.salaryCurrency}
          onChange={handleChange}
          className="w-1/3 p-2 border rounded"
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
          {/* Add more currencies as needed */}
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {job ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Jobs;
