import { useState } from 'react';
import styles from '../styles/Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import Container from '../components/common/Container';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { GridLoader } from 'react-spinners';
import { useUser } from '../hooks/useUser';
import MessageDisplayCard from '../components/common/MessageDisplayCard';
import { SignUpFormData } from '../interfaces';
import { validateSignUpForm } from '../utils/validationUtils';

const Join = () => {
  const { signUp, loading, signUpError, clearErrors } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    lastName: '',
    firstName: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpFormData, string>>
  >({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateSignUpForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    clearErrors();
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
                size={40}
                className={styles.auth_loading}
              />
            )}
            <h2>Join Us</h2>
            <form
              className={styles.sign_up_form}
              onSubmit={handleSubmit}
              aria-labelledby="signup-form"
              noValidate
            >
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
                    aria-describedby={
                      errors.firstName ? 'firstNameError' : undefined
                    }
                    className={errors.firstName ? styles.error_border : ''}
                  />
                  {errors.firstName && (
                    <p id="firstNameError" className={styles.error_msg}>
                      {errors.firstName}
                    </p>
                  )}
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
                    aria-describedby={
                      errors.lastName ? 'lastNameError' : undefined
                    }
                    className={errors.lastName ? styles.error_border : ''}
                  />
                  {errors.lastName && (
                    <p id="lastNameError" className={styles.error_msg}>
                      {errors.lastName}
                    </p>
                  )}
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
                  aria-describedby={errors.email ? 'emailError' : undefined}
                  className={errors.email ? styles.error_border : ''}
                />
                {errors.email && (
                  <p id="emailError" className={styles.error_msg}>
                    {errors.email}
                  </p>
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
                  aria-describedby={
                    errors.password ? 'passwordError' : undefined
                  }
                  className={errors.password ? styles.error_border : ''}
                />
                {errors.password && (
                  <p id="passwordError" className={styles.error_msg}>
                    {errors.password}
                  </p>
                )}
                <button
                  type="button"
                  className={styles.password_toggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
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
                  aria-describedby={
                    errors.confirmPassword ? 'confirmPasswordError' : undefined
                  }
                  className={errors.confirmPassword ? styles.error_border : ''}
                />
                {errors.confirmPassword && (
                  <p id="confirmPasswordError" className={styles.error_msg}>
                    {errors.confirmPassword}
                  </p>
                )}

                <button
                  type="button"
                  className={styles.password_toggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className={styles.form_input_group_chkbox}>
                <label className={styles.chkbox_label}>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    aria-describedby={
                      errors.agreeToTerms ? 'agreeToTermsError' : undefined
                    }
                  />
                  <span>
                    I agree to the
                    <Link to={'/terms-and-conditions'}>
                      terms and conditions
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p id="agreeToTermsError" className={styles.error_msg}>
                    {errors.agreeToTerms}
                  </p>
                )}
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
                
                {loading ? 'Creating account...' : 'Create An Account'}
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
