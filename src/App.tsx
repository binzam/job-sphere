import './styles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:category" element={<Jobs />} />
          <Route path="/jobs/:category/:id" element={<JobDescription />} />
          <Route path="/jobs/:category/:id/apply" element={<JobApplication />} />
          <Route path="/post-a-job" element={<PostJob />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
