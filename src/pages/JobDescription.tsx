import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Job } from '../interfaces';
import styles from '../styles/JobDescription.module.css';
import Container from '../components/Container';
import { Loader } from '../components/Loader';
import { FaBusinessTime, FaLocationDot, FaPeopleGroup } from 'react-icons/fa6';
import { TbMoneybag } from 'react-icons/tb';
import { BiCategory } from 'react-icons/bi';
import { FaFileUpload, FaRunning } from 'react-icons/fa';
import { SiLevelsdotfyi } from 'react-icons/si';
import { MdOutlineDescription } from 'react-icons/md';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import JobListing from '../components/JobListing';
const JobDescription = () => {
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const getSimilarJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/jobs', {
        params: {
          category: job?.category,
        },
      });
      console.log(response);
      setSimilarJobs(response.data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get<Job>(
          `http://localhost:3000/jobs/${id}`
        );
        setJob(response.data);
      } catch {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
    getSimilarJobs();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!job) return <p className={styles.not_found}>Job not found</p>;
  return (
    <Container>
      <div className={styles.job_description_page}>
        <div className={styles.job_description}>
          <div className={styles.header}>
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className={styles.logo}
            />
            <div className={styles.header_text}>
              <h1>{job.position}</h1>
              <p className={styles.company_name}>@{job.company}</p>
              <div className={styles.flex_gap}>
                <FaLocationDot className={styles.location_icon} />
                <p>{job.location}</p>
              </div>
            </div>
          </div>
          <div className={styles.meta_desc_wrap}>
            <div className={styles.meta}>
              <div className={styles.flex_gap}>
                <BiCategory className={styles.meta_icon} />
                <span>{job.category}</span>
              </div>
              <div className={styles.flex_gap}>
                <FaFileUpload className={styles.meta_icon} />
                <span>{job.postedAt}</span>
              </div>
              <div className={styles.flex_gap}>
                <FaBusinessTime className={styles.meta_icon} />
                <span>{job.contract}</span>
              </div>
              <div className={styles.flex_gap}>
                <SiLevelsdotfyi className={styles.meta_icon} />
                <span>{job.level}</span>
              </div>
              <div className={styles.flex_gap}>
                <FaPeopleGroup className={styles.meta_icon} />
                <span>
                  {job.slots}
                  {job.slots > 1 ? ' Positions' : ' Position'}
                </span>
              </div>
              <div className={styles.flex_gap}>
                <TbMoneybag className={styles.bag_icon} />
                <p className={styles.salary}>{job.salary}</p>
              </div>
              <button className={styles.apply_button}>
                <FaRunning />
                Apply Now!
              </button>
            </div>
            <div className={styles.desc_req_wrap}>
              <div>
                <h4>
                  <MdOutlineDescription />
                  Job Description
                </h4>
                <p className={styles.description}>{job.description}</p>
              </div>
              <div>
                <h4>
                  <IoMdInformationCircleOutline />
                  Job Requirements
                </h4>
                <ul className={styles.requirements}>
                  {job.requirements.map((req) => (
                    <li key={req} className={styles.requirement}>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>
                  <IoMdInformationCircleOutline />
                  Skills Required
                </h4>

                <div className={styles.tags}>
                  {job.languages.map((lang) => (
                    <span key={lang} className={styles.tag}>
                      {lang}
                    </span>
                  ))}
                  {job.tools.map((tool) => (
                    <span key={tool} className={styles.tag}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.similar_listings}>
          <small>Similar Jobs</small>
          <JobListing listing={similarJobs} />

          <Link to="/jobs" className={styles.cta_button}>
            See All Jobs
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default JobDescription;
