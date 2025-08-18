// frontend/src/pages/CourseLearningPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById, getMyEnrollment, markModuleAsComplete, downloadCertificate } from '../services/course.service';

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
    }
    const videoId = urlObj.searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (error) {
    return null;
  }
};

const CourseLearningPage = () => {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const courseDataPromise = getCourseById(courseId);
      const enrollmentDataPromise = getMyEnrollment(courseId);
      const [courseData, enrollmentData] = await Promise.all([courseDataPromise, enrollmentDataPromise]);
      
      setCourse(courseData);
      setEnrollment(enrollmentData);
      // Atur modul pertama sebagai modul aktif jika belum ada yang dipilih
      if (!activeModuleId && courseData.modules.length > 0) {
        setActiveModuleId(courseData.modules[0]._id);
      }
    } catch (err) {
      setError('Gagal memuat data kursus. Pastikan Anda sudah terdaftar.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const handleMarkAsComplete = async () => {
    try {
      const updatedEnrollment = await markModuleAsComplete(courseId, activeModuleId);
      setEnrollment(updatedEnrollment);
    } catch (err) {
      alert('Gagal menandai modul sebagai selesai.');
    }
  };
  
  const handleDownloadCertificate = async () => {
    try {
        const pdfBlob = await downloadCertificate(courseId);
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `sertifikat-${course.title.replace(/\s+/g, '-')}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (err) {
        alert('Gagal mengunduh sertifikat.');
    }
  };

  const activeModule = useMemo(() => {
    return course?.modules.find(m => m._id === activeModuleId);
  }, [course, activeModuleId]);

  const progress = useMemo(() => {
    if (!course || !enrollment) return 0;
    const totalModules = course.modules.length;
    const completedModules = enrollment.completedModules.length;
    return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
  }, [course, enrollment]);

  if (loading) return <div className="text-center p-8">Memuat ruang belajar...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!course) return <div className="text-center p-8">Kursus tidak ditemukan.</div>;

  const isModuleCompleted = enrollment.completedModules.includes(activeModuleId);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      {/* Sidebar Modul */}
      <aside className="w-full md:w-80 bg-white border-r flex-shrink-0">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">{course.title}</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{Math.round(progress)}% Selesai</p>
        </div>
        <ul className="divide-y">
          {course.modules.map((module, index) => (
            <li key={module._id}>
              <button onClick={() => setActiveModuleId(module._id)} className={`w-full text-left p-4 hover:bg-gray-100 ${activeModuleId === module._id ? 'bg-indigo-50' : ''}`}>
                <div className="flex items-center">
                  <span className={`mr-3 w-5 h-5 rounded-full flex items-center justify-center text-xs ${enrollment.completedModules.includes(module._id) ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                    {enrollment.completedModules.includes(module._id) ? '✓' : index + 1}
                  </span>
                  <span>{module.title}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Konten Utama */}
      <main className="flex-grow p-4 md:p-8 bg-gray-50">
        {activeModule ? (
          <>
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe src={getYouTubeEmbedUrl(activeModule.youtubeUrl)} title={activeModule.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full rounded-lg shadow-lg"></iframe>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-3">{activeModule.title}</h1>
              <p className="text-gray-700 mb-4">{activeModule.description}</p>
              
              <button onClick={handleMarkAsComplete} disabled={isModuleCompleted} className={`px-5 py-2 rounded-md font-semibold text-white ${isModuleCompleted ? 'bg-green-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {isModuleCompleted ? '✓ Telah Selesai' : 'Tandai Selesai'}
              </button>
              
              { progress === 100 && (
                <button onClick={handleDownloadCertificate} className="ml-4 px-5 py-2 rounded-md font-semibold text-white bg-yellow-500 hover:bg-yellow-600">
                  Unduh Sertifikat
                </button>
              )}
            </div>
          </>
        ) : (
          <p>Pilih modul untuk memulai.</p>
        )}
      </main>
    </div>
  );
};

export default CourseLearningPage;