import { useState } from 'react';
import styles from '../styles/Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import Container from '../components/Container';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { GridLoader } from 'react-spinners';
import { useUser } from '../hooks/useUser';
import MessageDisplayCard from '../components/MessageDisplayCard';
interface AuthData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const Join = () => {
  const { signUp, loading, signUpError } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthData>({
    email: '',
    lastName: '',
    firstName: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await signUp({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      agreeToTerms: formData.agreeToTerms,
    });

    if (success) {
      setFormData({
        email: '',
        lastName: '',
        firstName: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
      });
      navigate('/auth/sign-in', {
        state: {
          successMessage: 'Account created successfully! Sign in to continue.',
        },
      });
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className={styles.auth_wrapper}>
      <Container>
        <div className={styles.auth_container}>
          <Link className={styles.back_link} to={'/'}>
            <IoArrowBackCircleSharp />
            Back to website
          </Link>

          <div className={styles.auth_form_container}>
            {loading && (
              <GridLoader
                color="#333"
                margin={30}
                size={50}
                className={styles.auth_loading}
              />
            )}
            <h2>Join Us</h2>
            <form onSubmit={handleSubmit} aria-labelledby="signup-form">
              <div className={styles.form_input_row}>
                <div className={styles.form_input_group}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    aria-required="true"
                  />
                </div>
                <div className={styles.form_input_group}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    aria-required="true"
                  />
                </div>
              </div>
              <div className={styles.form_input_group}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-required="true"
                />
              </div>
              <div className={styles.form_input_group}>
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-required="true"
                />
                <span
                  className={styles.password_toggle}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className={styles.form_input_group}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-required="true"
                />
                <span
                  className={styles.password_toggle}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className={styles.form_input_group_chkbox}>
                <label className={styles.chkbox_label}>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <span>
                    I agree to the
                    <Link to={'/terms-and-conditions'}>
                      terms and conditions
                    </Link>
                  </span>
                </label>
              </div>
              {signUpError && (
                <div role="alert" aria-live="assertive">
                  <MessageDisplayCard message={signUpError} type="error" />
                </div>
              )}

              <button
                type="submit"
                className={styles.form_btn}
                disabled={loading}
              >
                Create An Account
              </button>
            </form>

            <p className={styles.form_redirect_link}>
              Already have an account? <Link to="/auth/sign-in">Sign In</Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Join;
