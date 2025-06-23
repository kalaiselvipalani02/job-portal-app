const Dashboard = () => {
  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechNova Solutions",
      location: "Remote",
      type: "Full-Time",
    },
    {
      id: 2,
      title: "React Developer",
      company: "MasynTech Pvt Ltd",
      location: "Coimbatore",
      type: "Onsite",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "PixelPro Studios",
      location: "Chennai",
      type: "Hybrid",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, Kalai 👋
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
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-blue-700">{job.title}</h3>
                <p className="text-gray-700">{job.company}</p>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{job.location}</span>
                  <span>{job.type}</span>
                </div>
                <button className="mt-4 text-blue-600 hover:underline text-sm">
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
