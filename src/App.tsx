import './styles/index.css';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { JobFilterProvider } from './context/JobFilterContext';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';
import { Loader } from './components/common/Loader';

const Home = lazy(() => import('./pages/Home'));
const Jobs = lazy(() => import('./pages/Jobs'));
const JobDescription = lazy(() => import('./pages/JobDescription'));
const JobApplication = lazy(() => import('./pages/JobApplication'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Join = lazy(() => import('./pages/Join'));
const SignIn = lazy(() => import('./pages/SignIn'));
function App() {

  return (
    <UserProvider>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
            <Route path="/auth" element={<AuthLayout />}>
              <Route index element={<Navigate to="sign-in" replace />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route path="join" element={<Join />} />
            </Route>
         

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="jobs"
              element={
                <JobFilterProvider>
                  <Jobs />
                </JobFilterProvider>
              }
            />

            <Route path="jobs/:category/:id" element={<JobDescription />} />
            <Route
              path="jobs/:category/:id/apply"
              element={
                <ProtectedRoute>
                  <JobApplication />
                </ProtectedRoute>
              }
            />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="terms-and-conditions" element={<Terms />} />
          </Route>
        </Routes>
      </Suspense>
    </UserProvider>
  );
}

export default App;
