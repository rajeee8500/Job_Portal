import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SearchByDate = () => {
  const [filter, setFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      let query = `http://localhost:5000/api/v1/job/jobs/sorted?filter=${filter}`;
      // let query = `https://job-portal-b-yoy1.onrender.com/api/v1/job/jobs/sorted?filter=${filter}`;
      const response = await axios.get(query);
      setJobs(response.data.jobs);
      setSearched(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="searchPage">
      <div className="container">
        <h1>Search Jobs By Date</h1>
        <div className="searchForm">
          <div>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Select</option>
              <option value="asc">Old Jobs</option>
              <option value="desc">Latest Jobs</option>
              {/* <option value="future">Future Jobs</option> */}
            </select>
          </div>
          <button onClick={handleSearch}>Search</button>
        </div>
        {searched && (
          <div className="results">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job._id} className="jobCard">
                  <p>
                    <span>Title:</span> {job.title}
                  </p>
                  <p>
                    <span>Description:</span> {job.description}
                  </p>
                  <p>
                    <span>Category:</span> {job.category}
                  </p>
                  <p>
                    <span>Country:</span> {job.country}
                  </p>
                  <p>
                    <span>City:</span> {job.city}
                  </p>
                  <p>
                    <span>Location:</span> {job.location}
                  </p>
                  <p>
                    <span>Fixed Salary:</span> {job.fixedSalary}
                  </p>
                  <p>
                    <span>Interview Date:</span>{" "}
                    {new Date(job.interviewDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span>Posted By:</span> {job.postedBy}
                  </p>
                  <p>
                    <span>Job Posted On:</span>{" "}
                    {new Date(job.jobPostedOn).toLocaleDateString()}
                  </p>
                  <p>
                    <span>Expired:</span> {job.expired ? "Yes" : "No"}
                  </p>
                </div>
              ))
            ) : (
              <p>No jobs found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchByDate;
