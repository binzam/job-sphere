import styles from '../styles/JobDetail.module.css';
import {
  FaBusinessTime,
  FaFileSignature,
  FaLocationDot,
  FaPeopleGroup,
} from 'react-icons/fa6';
import { TbMoneybag } from 'react-icons/tb';
import { BiCategory } from 'react-icons/bi';
import { FaFileUpload } from 'react-icons/fa';
import { SiLevelsdotfyi } from 'react-icons/si';
import { MdOutlineDescription, MdOutlineWork } from 'react-icons/md';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { Job } from '../interfaces';
import { Link } from 'react-router-dom';
import { HiOutlineIdentification } from 'react-icons/hi';

interface JobDetailCardProps {
  job: Job;
}
const JobDetailCard: React.FC<JobDetailCardProps> = ({ job }) => {
  return (
    <div className={styles.job_detail_card}>
      <span className={styles.card_icon}>
        <MdOutlineWork />
      </span>
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
            <HiOutlineIdentification className={styles.meta_icon} />
            <span>{job.role}</span>
          </div>
          <div className={styles.flex_gap}>
            <SiLevelsdotfyi className={styles.meta_icon} />
            <span>{job.level}</span>
          </div>
          <div className={styles.flex_gap}>
            <FaBusinessTime className={styles.meta_icon} />
            <span>{job.contract}</span>
          </div>
          <div className={styles.flex_gap}>
            <FaPeopleGroup className={styles.meta_icon} />
            <span>
              {job.slots}
              {job.slots > 1 ? ' Positions' : ' Position'}
            </span>
          </div>
          <div className={styles.flex_gap}>
            <FaFileUpload className={styles.meta_icon} />
            <span>{job.postedAt}</span>
          </div>
          <div className={styles.flex_gap}>
            <TbMoneybag className={styles.bag_icon} />
            <p className={styles.salary}>{job.salary}</p>
          </div>

          <Link
            to={`/jobs/${job.category}/${job.id}/apply`}
            className={styles.apply_button}
          >
            <FaFileSignature />
            Apply Now!
          </Link>
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
  );
};

export default JobDetailCard;
