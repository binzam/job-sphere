import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/JobApplication.module.css';
import { useJob } from '../hooks/useJobs';
import { Loader } from '../components/Loader';
import { FaFileUpload } from 'react-icons/fa';
import { TbHandClick } from 'react-icons/tb';
import Container from '../components/Container';
import JobListingCardHeader from '../components/JobListingCardHeader';
interface FormDataState {
  firstName: string;
  lastName: string;
  email: string;
  resume: File | null;
  coverLetter: string;
}

const JobApplication: React.FC = () => {
  const { id } = useParams<{ category: string; id: string }>();
  const { job } = useJob(id!);

  const [formData, setFormData] = useState<FormDataState>({
    firstName: '',
    lastName: '',
    email: '',
    resume: null,
    coverLetter: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataState, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, resume: file }));
      setFileName(file.name);
      setErrors((prev) => ({ ...prev, resume: '' }));
    }
  };
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormDataState, string>> = {};
    if (!formData.firstName.trim())
      newErrors.firstName = 'This field is required';
    if (!formData.lastName.trim())
      newErrors.lastName = 'This field is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.coverLetter.trim())
      newErrors.coverLetter = 'This field is required';
    if (!formData.resume) newErrors.resume = 'Please upload your CV';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
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
       `${import.meta.env.VITE_API_URL}jobs/${id}/apply`,
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
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFileName(null);
    } catch (error) {
      console.log(error);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  if (loading || !job) return <Loader />;

  return (
    <Container>
      <div className={styles.application_page}>
        <div className={styles.application_page_wrapper}>
          <div className={styles.job_card_wrapper}>
            <JobListingCardHeader job={job} />
          </div>
          <div className={styles.application_form_wrapper}>
            <h2>Apply for this Job</h2>
            <form
              onSubmit={handleSubmit}
              className={styles.application_form}
              noValidate
            >
              <div className={styles.form_input_row}>
                <div className={styles.form_input_sml}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    className={`${styles.input_field} ${
                      errors.firstName ? styles.error_border : ''
                    }`}
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    aria-describedby="firstNameError"
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <p id="firstNameError" className={styles.error_text}>
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className={styles.form_input_sml}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    className={`${styles.input_field} ${
                      errors.lastName ? styles.error_border : ''
                    }`}
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    aria-describedby="lastNameError"
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <p id="lastNameError" className={styles.error_text}>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.form_input}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  className={`${styles.input_field} ${
                    errors.email ? styles.error_border : ''
                  }`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  aria-describedby="emailError"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p id="emailError" className={styles.error_text}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className={styles.form_input}>
                <label htmlFor="coverLetter">Cover Letter</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={4}
                  className={`${styles.input_text_area} ${
                    errors.coverLetter ? styles.error_border : ''
                  }`}
                  aria-describedby="coverLetterError"
                  aria-invalid={!!errors.coverLetter}
                />
                {errors.coverLetter && (
                  <p id="coverLetterError" className={styles.error_text}>
                    {errors.coverLetter}
                  </p>
                )}
              </div>

              <div className={styles.form_input_file}>
                {fileName && (
                  <p className={styles.file_selected}>
                    Selected File: <strong>{fileName}</strong>
                  </p>
                )}
                <label
                  htmlFor="cvFile"
                  className={`${styles.file_input_label} ${
                    fileName && styles.selected
                  }`}
                >
                  <TbHandClick />
                  Click to {fileName ? 'choose a different ' : 'select'} CV file{' '}
                  <small>(PDF or DOC)</small>
                </label>
                <input
                  id="cvFile"
                  ref={fileInputRef}
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className={styles.input_field_file}
                  aria-describedby="resumeError"
                  aria-invalid={!!errors.resume}
                />
                {errors.resume && (
                  <p id="resumeError" className={styles.error_text}>
                    {errors.resume}
                  </p>
                )}
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
    </Container>
  );
};

export default JobApplication;
