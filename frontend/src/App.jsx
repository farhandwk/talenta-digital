// frontend/src/App.jsx

import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import QuizListPage from './pages/QuizListPage';
import QuizTakingPage from './pages/QuizTakingPage';
import QuizResultPage from './pages/QuizResultPage';
import MyResultsPage from './pages/MyResultsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import QuestionBankPage from './pages/trainer/QuestionBankPage';
import TestManagementPage from './pages/trainer/TestManagementPage';
import CourseListPage from './pages/CourseListPage'; 
import CourseDetailPage from './pages/CourseDetailPage'; 
import CourseLearningPage from './pages/CourseLearningPage';
import CourseManagementPage from './pages/trainer/CourseManagementPage'; 
import ModuleManagementPage from './pages/trainer/ModuleManagementPage';
import CareerHomePage from './pages/CareerHomePage'; 
import CareerTestPage from './pages/CareerTestPage'; 
import CareerResultPage from './pages/CareerResultPage';
import ConsultantListPage from './pages/ConsultantListPage';
import ConsultantManagementPage from './pages/trainer/ConsultantManagementPage';
import MyProjectsPage from './pages/MyProjectsPage';
import ProjectWorkspacePage from './pages/ProjectWorkspacePage';
import MentorshipQueuePage from './pages/trainer/MentorshipQueuePage';
import MyMentoredProjectsPage from './pages/trainer/MyMentoredProjectsPage';
import ProjectGalleryPage from './pages/ProjectGalleryPage'; // <-- Impor baru


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar isOpen={isSidebarOpen} toogleSidebar={handleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toogleSidebar={handleSidebar} />
      {isSidebarOpen && (
        <div className={`fixed top-0 left-0 w-full h-full bg-black/10`} onClick={handleSidebar} style={{backdropFilter: "blur(5px)"}}></div>
      )}
      <main className='pt-16'>
        <Routes>
          {/* --- Rute Publik --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/projects/gallery" element={<ProjectGalleryPage />} />

          {/* --- Grup Rute Privat (Harus Login) --- */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<DashboardPage />} />
            
            {/* Rute untuk semua peran yang sudah login */}
            <Route path="quiz" element={<QuizListPage />} />
            <Route path="quiz/test/:id" element={<QuizTakingPage />} />
            <Route path="quiz/result/:id" element={<QuizResultPage />} />
            <Route path="quiz/my-results" element={<MyResultsPage />} />

            {/* Rute Skill Lab */}
            <Route path="courses" element={<CourseListPage />} />
            <Route path="courses/:id" element={<CourseDetailPage />} />
            <Route path="learn/:id" element={<CourseLearningPage />} />

            {/* Rute Kompas Karier */}
            <Route path="career" element={<CareerHomePage />} />
            <Route path="career/test" element={<CareerTestPage />} />
            <Route path="career/result" element={<CareerResultPage />} />
            <Route path="career/consultants" element={<ConsultantListPage />} />

            <Route path="projects" element={<MyProjectsPage />} />
            <Route path="projects/:id" element={<ProjectWorkspacePage />} />

            {/* --- Sub-Grup Rute Khusus Trainer --- */}
            <Route path="trainer" element={<ProtectedRoute allowedRoles={['trainer']} />}>
              <Route path="questions" element={<QuestionBankPage />} />
              <Route path="tests" element={<TestManagementPage />} />
              <Route path="courses" element={<CourseManagementPage />} />
              <Route path="courses/:courseId/modules" element={<ModuleManagementPage />} />
              <Route path="consultants" element={<ConsultantManagementPage />} />
              <Route path="projects/queue" element={<MentorshipQueuePage />} />
              <Route path="projects/my-mentored" element={<MyMentoredProjectsPage />} />
              {/* Nanti rute trainer lain (misal: /trainer/tests) bisa ditambahkan di sini */}
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;