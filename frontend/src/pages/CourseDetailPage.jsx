// frontend/src/pages/CourseDetailPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, getMyEnrollment, enrollInCourse } from '../services/course.service';
import AuthContext from '../contexts/AuthContext';

const CourseDetailPage = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        // Ambil data kursus dan data pendaftaran secara bersamaan
        const courseDataPromise = getCourseById(courseId);
        const enrollmentDataPromise = getMyEnrollment(courseId).catch(() => null); // Tangkap error jika belum terdaftar

        const [courseData, enrollmentData] = await Promise.all([
          courseDataPromise,
          enrollmentDataPromise,
        ]);

        setCourse(courseData);
        setEnrollment(enrollmentData);
      } catch (err) {
        setError('Gagal memuat detail kursus.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, user]);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      await enrollInCourse(courseId);
      // Setelah berhasil mendaftar, langsung arahkan ke halaman belajar
      // Kita akan buat halaman /learn/:courseId nanti
      navigate(`/learn/${courseId}`);
    } catch (err) {
      alert('Gagal mendaftar kursus. Mungkin Anda sudah terdaftar.');
      setIsEnrolling(false);
    }
  };
  
  const handleContinueLearning = () => {
    navigate(`/learn/${courseId}`);
  };

  if (loading) return <div className="text-center p-8">Memuat detail kursus...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!course) return <div className="text-center p-8">Kursus tidak ditemukan.</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Detail Kursus */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Modul Pembelajaran</h2>
            {course.modules.length > 0 ? (
              <ul className="space-y-3">
                {course.modules.map((module, index) => (
                  <li key={module._id} className="flex items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-indigo-600 font-bold mr-4">{index + 1}</span>
                    <div>
                      <p className="font-medium text-gray-800">{module.title}</p>
                      {module.duration && <p className="text-sm text-gray-500">Durasi: {module.duration}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Modul untuk kursus ini akan segera ditambahkan.</p>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Kartu Aksi */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
            <div className="w-full h-40 bg-gray-200 mb-4 rounded-md overflow-hidden">
              <img src={`https://placehold.co/600x400/EEE/31343C?text=${course.title}`} alt={course.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm text-gray-500 mb-4">Dibuat oleh: <span className="font-medium">{course.createdBy?.name || 'Trainer'}</span></p>
            
            {enrollment ? (
              <button onClick={handleContinueLearning} className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
                Lanjutkan Belajar
              </button>
            ) : (
              <button onClick={handleEnroll} disabled={isEnrolling} className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-indigo-400">
                {isEnrolling ? 'Mendaftarkan...' : 'Daftar Kursus Ini'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;