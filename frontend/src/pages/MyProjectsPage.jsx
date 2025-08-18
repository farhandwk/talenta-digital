// frontend/src/pages/MyProjectsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyProjects, createProject } from '../services/project.service';
import ProjectFormModal from '../components/ProjectFormModal';

const MyProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getMyProjects();
      setProjects(data);
    } catch (err) {
      setError('Gagal memuat proyek Anda.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSaveProject = async (projectData) => {
    try {
      const newProject = await createProject(projectData);
      setIsModalOpen(false);
      // Arahkan langsung ke ruang kerja proyek yang baru dibuat
      navigate(`/projects/${newProject._id}`);
    } catch (err) {
      alert('Gagal membuat proyek baru.');
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat proyek Anda...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Inkubator: Proyek Saya</h1>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            + Ajukan Ide Baru
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Anda belum punya proyek.</h2>
            <p className="text-gray-600 mt-2">Wujudkan idemu menjadi kenyataan sekarang!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link to={`/projects/${project._id}`} key={project._id} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{project.projectName}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  project.status === 'Dalam Bimbingan' ? 'bg-green-100 text-green-800' :
                  project.status === 'Menunggu Mentor' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
      />
    </>
  );
};

export default MyProjectsPage;