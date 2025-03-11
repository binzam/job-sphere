import { useState } from 'react';
import styles from '../styles/Auth.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import Container from '../components/common/Container';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { GridLoader } from 'react-spinners';
import MessageDisplayCard from '../components/common/MessageDisplayCard';
import { useUser } from '../hooks/useUser';
import DOMPurify from 'dompurify';
import { SignInFormData } from '../interfaces';
const SignIn = () => {
  const { signIn, loading, signInError, clearErrors } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInFormData, string>>
  >({});
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      formValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
      formValid = false;
    }
    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    clearErrors();
    const success = await signIn(formData.email, formData.password);
    if (success) {
      setFormData({ email: '', password: '' });
      navigate('/', {
        state: { successMessage: `Welcome ${formData.email}!` },
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className={styles.auth_wrapper}>
      <Container>
        <div className={styles.auth_container}>
          <Link className={styles.back_link} to={'/'}>
            <IoArrowBackCircleSharp />
            Back to website
          </Link>
          {successMessage && (
            <MessageDisplayCard
              message={DOMPurify.sanitize(successMessage)}
              type="success"
            />
          )}
          <div className={styles.auth_form_container}>
            {loading && (
              <GridLoader
                color="#333"
                margin={30}
                size={40}
                className={styles.auth_loading}
              />
            )}
            <h2>Welcome</h2>
            <form
              onSubmit={handleSubmit}
              aria-labelledby="signin-form"
              className={styles.sign_in_form}
            >
              <input
                type="text"
                name="honeypot"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
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
                  className={errors.email ? styles.error_border : ''}
                />
                {errors.email && (
                  <p className={styles.error_msg}>{errors.email}</p>
                )}
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
                  className={errors.password ? styles.error_border : ''}
                />

                <button
                  type="button"
                  className={styles.password_toggle}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className={styles.error_msg}>{errors.password}</p>
                )}
              </div>
              {signInError && (
                <div role="alert" aria-live="assertive">
                  <MessageDisplayCard message={signInError} type="error" />
                </div>
              )}

              <button
                type="submit"
                className={styles.form_btn}
                disabled={loading}
              >
                {loading ? 'Signing in ...' : 'Sign In'}
              </button>
            </form>

            <p className={styles.form_redirect_link}>
              New here? <Link to="/auth/join">Create an Account</Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
