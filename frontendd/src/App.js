import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import Signup from './components/register/register';
import Login from './components/Login/login';
import Dashboard from './components/dashboard/dashboard';
import AdminDashboard from './components/dashboard/Admin/AdminDashboard';
import DiscussionActions from './components/discussion/discussionnav';
import SuccessStoriesActions from './components/dashboard/sucess-stories/sucess-story';
import AddStory from './components/dashboard/sucess-stories/Addsucessstory';
import ViewStories from './components/dashboard/sucess-stories/ViewAllstories';
import ViewOneStory from './components/dashboard/sucess-stories/Viewonestory';
import DiscussionComponent from './components/discussion/Adddiscussion';
import CreateThreadComponent from './components/discussion/Createthred';
import ThreadComponent from './components/discussion/Threadcomponent';
import PlantGuide from './components/userplant/userplantguide';
import VideoTutorial from './components/userplant/uservideo';
import AdminPlantGuide from './components/adminplant/adminplantguide';
import AdminVideoTutorial from './components/adminplant/adminvideo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/discussion" element={<DiscussionActions />} />
        <Route path="/success-stories" element={<SuccessStoriesActions />} />
        <Route path="/success-stories/add" element={<AddStory />} />
        <Route path="/success-stories/view" element={<ViewStories />} />
        <Route path="/success-stories/view/:id" element={<ViewOneStory />} />
        <Route path="/discussion/view" element={<DiscussionComponent />} />
        <Route path="/discussion/add" element={<CreateThreadComponent />} />
        <Route path="/thread/:id" element={<ThreadComponent />} />
        <Route path="/guide" element={<PlantGuide />} />
        <Route path="/video" element={<VideoTutorial />} />
        <Route path="/adminplant" element={<AdminPlantGuide />} />
        <Route path="/adminvideo" element={<AdminVideoTutorial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; // Default export


