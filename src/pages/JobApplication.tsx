import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/JobApplication.module.css';
import { useJob } from '../hooks/useJobs';
import { Loader } from '../components/common/Loader';
import { FaFileUpload } from 'react-icons/fa';
import { TbHandClick } from 'react-icons/tb';
import Container from '../components/common/Container';
import JobListingCardHeader from '../components/job/JobListingCardHeader';
import MessageDisplayCard from '../components/common/MessageDisplayCard';
import { useUser } from '../hooks/useUser';
import { GridLoader } from 'react-spinners';
import { ApplicationFormDataState } from '../interfaces';
import { validateApplicationForm } from '../utils/validationUtils';
import { submitApplication } from '../api/jobs';
import DOMPurify from 'dompurify';

const JobApplication: React.FC = () => {
  const { id } = useParams<{ category: string; id: string }>();
  const { job } = useJob(id!);
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ApplicationFormDataState>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    resume: null,
    coverLetter: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ApplicationFormDataState, string>>
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
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          resume: 'Only PDF or DOC files are allowed',
        }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          resume: 'File size must be under 2MB',
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
      setFileName(file.name);
      setErrors((prev) => ({ ...prev, resume: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedCoverLetter = DOMPurify.sanitize(formData.coverLetter);
    const validationErrors = validateApplicationForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(false);
    const isSuccess = await submitApplication({
      jobId: id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      coverLetter: sanitizedCoverLetter,
      resume: fileName || formData.resume?.name || '',
    });

    if (isSuccess) {
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
      setTimeout(() => {
        navigate('/jobs');
      }, 3000);
    } else {
      setError('Failed to submit application. Please try again.');
    }

    setLoading(false);
  };
  if (!job) return <Loader />;

  return (
    <Container>
      <div className={styles.application_page}>
        <div className={styles.application_page_wrapper}>
          <div className={styles.job_card_wrapper}>
            <JobListingCardHeader job={job} />
          </div>
          {success ? (
            <MessageDisplayCard
              message="Application successfully submitted!"
              type="success"
              fixed
            />
          ) : (
            <div className={styles.application_form_wrapper}>
              <h2>Apply for this Job</h2>
              <form
                onSubmit={handleSubmit}
                className={styles.application_form}
                noValidate
              >
                {loading && (
                  <GridLoader
                    color="#006986"
                    margin={30}
                    size={50}
                    className={styles.application_loading}
                  />
                )}
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
                      aria-describedby={
                        errors.firstName ? 'firstNameError' : undefined
                      }
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
                      aria-describedby={
                        errors.firstName ? 'lastNameError' : undefined
                      }
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
                    autoComplete="true"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    aria-describedby={
                      errors.firstName ? 'emailError' : undefined
                    }
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
                    aria-describedby={
                      errors.firstName ? 'coverLetterError' : undefined
                    }
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
                    Click to {fileName ? 'choose a different ' : 'select'} CV
                    file <small>(PDF or DOC)</small>
                  </label>
                  <input
                    id="cvFile"
                    ref={fileInputRef}
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className={styles.input_field_file}
                    aria-describedby={
                      errors.firstName ? 'resumeError' : undefined
                    }
                    aria-invalid={!!errors.resume}
                  />
                  {errors.resume && (
                    <p id="resumeError" className={styles.error_text}>
                      {errors.resume}
                    </p>
                  )}
                </div>

                {error && <MessageDisplayCard message={error} type="error" />}

                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submit_btn}
                >
                  <FaFileUpload />
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default JobApplication;
