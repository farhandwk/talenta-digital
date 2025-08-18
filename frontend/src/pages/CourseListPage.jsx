// frontend/src/pages/CourseListPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../services/course.service';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getAllCourses(currentPage);
        setCourses(response.data);
        setPaginationInfo({
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
        setError(null);
      } catch (err) {
        setError('Gagal memuat daftar kursus. Coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage]);

  if (loading) {
    return <div className="text-center p-8">Memuat kursus...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Skill Lab</h1>
      <p className="text-gray-600 mb-8">Tingkatkan keahlianmu dengan memilih kursus di bawah ini.</p>
      
      {courses.length === 0 ? (
        <p>Belum ada kursus yang tersedia saat ini.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link to={`/courses/${course._id}`} key={course._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="w-full h-48 bg-gray-200">
                {/* Nanti kita ganti dengan gambar thumbnail asli */}
                <img src={`https://placehold.co/600x400/EEE/31343C?text=${course.title}`} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                <div className="text-sm text-gray-500">
                  Dibuat oleh: <span className="font-medium">{course.createdBy?.name || 'Trainer'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Nanti kita akan tambahkan komponen pagination di sini */}
    </div>
  );
};

export default CourseListPage;