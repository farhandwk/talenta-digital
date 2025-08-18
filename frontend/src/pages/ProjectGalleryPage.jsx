// frontend/src/pages/ProjectGalleryPage.jsx

import React, { useState, useEffect } from 'react';
import { getPublicProjects } from '../services/project.service';

const ProjectGalleryPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getPublicProjects();
        setProjects(data);
      } catch (err) {
        setError('Gagal memuat galeri proyek.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="p-8 text-center">Memuat Galeri Proyek...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🚀 Galeri Proyek Inkubator</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Lihat ide-ide inovatif yang telah dikembangkan oleh para wirausahawan di platform kami.</p>
      
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">Galeri masih kosong. Jadilah yang pertama untuk menampilkan karyamu!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{project.projectName}</h2>
              <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-4">{project.description}</p>
              <div className="border-t pt-4 mt-4 text-sm text-gray-500">
                Oleh: <span className="font-medium text-gray-800">{project.submittedBy.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGalleryPage;