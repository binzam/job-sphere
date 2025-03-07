import './styles/index.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import SignIn from './pages/SignIn';
import Join from './pages/Join';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import JobDescription from './pages/JobDescription';
import PostJob from './pages/PostJob';
import ScrollToTop from './components/ScrollToTop';
import JobApplication from './pages/JobApplication';
import { JobFilterProvider } from './context/JobFilterContext';
import About from './pages/About';
import AuthLayout from './layouts/AuthLayout';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="join" element={<Join />} />
          <Route path="sign-in" element={<SignIn />} />
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
          <Route path="post-a-job" element={<PostJob />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms-and-conditions" element={<Terms />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
