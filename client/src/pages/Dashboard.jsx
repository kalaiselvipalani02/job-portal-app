import { useState, useEffect } from "react";
import UserSideBar from "../components/UserSideBar";
import axios from "axios";
const Dashboard = () => {
  const [jobs, setJobs] = useState([]); //holding current list of jobs
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); //state for pagination
  const [user, setUser] = useState(null);

  const PAGE_SIZE = 6;

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
        const res = await axios.get("http://localhost:5001/api/unapply", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(res.data);
      } catch (error) {
        console.log("Failed to fetch Jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/user/profile", {
          withCredentials: true,
        });
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // // Sample job data
  // const jobs = [
  //   {
  //     id: 1,
  //     title: "Frontend Developer",
  //     company: "TechNova Solutions",
  //     location: "Remote",
  //     type: "Full-Time",
  //   },
  //   {
  //     id: 2,
  //     title: "React Developer",
  //     company: "MasynTech Pvt Ltd",
  //     location: "Coimbatore",
  //     type: "Onsite",
  //   },
  //   {
  //     id: 3,
  //     title: "UI/UX Designer",
  //     company: "PixelPro Studios",
  //     location: "Chennai",
  //     type: "Hybrid",
  //   },
  // ];

  const showModel = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleApply = async () => {
    console.log(`selected:${selectedJob._id}`);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:5001/api/jobs/${selectedJob._id}/apply`,
        {}, // no body needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Application submitted successfully!");
      closeModal();
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      alert("Failed to apply: " + msg);
    }
  };

  return (
    <>
      <div className="min-h-screen flex bg-gray-100">
        <UserSideBar />
        <div className="flex-1 min-h-screen bg-gray-100">
          {/* Top Navbar */}

          {/* Main Section */}
          <div className="max-w-8xl mx-auto px-4 py-6">
            {/* Welcome Message */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, 👋
              </h1>
              <p className="text-gray-600">Find your dream job below</p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Search by job title or company..."
                className="flex-1 p-3 rounded border border-gray-300"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                Search
              </button>
            </div>

            {/* Recommended Jobs */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Recommended Jobs
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(jobs?.length ?? 0) > 0 ? (
                  jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
                    >
                      <h3 className="text-lg font-bold text-blue-700">
                        {job.title}
                      </h3>
                      <p className="text-gray-700">{job.company}</p>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>{job.location}</span>
                        <span>{job.type}</span>
                      </div>
                      <button
                        onClick={() => showModel(job)}
                        className="mt-4 text-blue-600 hover:underline text-sm"
                      >
                        View Details →
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No jobs available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {showModal && selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedJob.title}
              </h2>

              <p className="text-gray-600 mb-2">{selectedJob.company}</p>
              <p className="text-gray-600 mb-2">{selectedJob.description}</p>
              <p className="text-gray-500 text-sm mb-4">
                {selectedJob.location} | {selectedJob.jobType}
              </p>
              <p className="text-gray-600 mb-4">
                Salary:
                {selectedJob.salary?.currency || "USD"}{" "}
                {selectedJob.salary?.min?.toLocaleString?.() || "N/A"} -
                {selectedJob.salary?.max?.toLocaleString?.() || "N/A"}
              </p>

              <button
                onClick={handleApply}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
