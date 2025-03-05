import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/JobApplication.module.css';
import JobListingCard from '../components/JobListingCard';
import { useJob } from '../hooks/useJobs';
import { Loader } from '../components/Loader';
import { FaFileUpload } from 'react-icons/fa';

const JobApplication = () => {
  const { id } = useParams<{ category: string; id: string }>();
  const { job } = useJob(id!);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    resume: null as File | null,
    coverLetter: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
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
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        resume: null,
        coverLetter: '',
      });
    } catch (error) {
      console.log(error);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  if (loading || !job) return <Loader />;

  return (
    <div className={styles.applicationPage}>
      <div className={styles.applicationPage_wrapper}>
        <JobListingCard job={job} />
        <div className={styles.application_wrap}>
          <h2>Apply for this Job</h2>
          <form onSubmit={handleSubmit} className={styles.applicationForm}>
            <div className={styles.form_input_row}>
              <div className={styles.form_input_sml}>
                <label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </label>
              </div>
              <div className={styles.form_input_sml}>
                <label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </label>
              </div>
            </div>
            <div className={styles.form_input}>
              <label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                />
              </label>
            </div>
            <div className={styles.form_input}>
              <label>
                Resume / CV (PDF or DOC)
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>
            <div className={styles.form_input}>
              <label>
                Cover Letter
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={4}
                />
              </label>
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {success && (
              <p className={styles.success}>
                Application submitted successfully!
              </p>
            )}

            <button type="submit" disabled={loading}>
              <FaFileUpload />
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
