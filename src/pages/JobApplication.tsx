import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/JobApplication.module.css';
import JobListingCard from '../components/JobListingCard';
import { Job } from '../interfaces';

const JobApplication = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    resume: null as File | null,
    coverLetter: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [job, setJob] = useState<Job | null>(null);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get<Job>(
          `http://localhost:3000/jobs/${id}/`
        );
        console.log(response);

        setJob(response.data);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob()
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files && e.target.files.length > 0) {
        setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('coverLetter', formData.coverLetter);
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      await axios.post(
        `http://localhost:3000/jobs/${id}/apply`,
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setSuccess(true);
      setFormData({ fullName: '', email: '', resume: null, coverLetter: '' });
    } catch (error) {
      console.log(error);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.applicationPage}>
      <JobListingCard job={job || {}} />
      <div>
        <h2>Apply for this Job</h2>
        <p>Category: {category}</p>
        <form onSubmit={handleSubmit} className={styles.applicationForm}>
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Resume (PDF or DOC)
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
          </label>

          <label>
            Cover Letter
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={4}
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}
          {success && (
            <p className={styles.success}>
              Application submitted successfully!
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
