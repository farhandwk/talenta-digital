// frontend/src/pages/ProjectWorkspacePage.jsx

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById, updateProject, requestMentorship, addFeedback, completeProject, acceptMentorship } from '../services/project.service';
import AuthContext from '../contexts/AuthContext';
import BusinessCanvas from '../components/projects/BusinessCanvas';
import FeedbackThread from '../components/projects/FeedbackThread';

const ProjectWorkspacePage = () => {
  const { id: projectId } = useParams();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- STATE BARU UNTUK EDITING ---
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [canvasState, setCanvasState] = useState(null);
  // -------------------------------

  const fetchProject = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProjectById(projectId);
      setProject(data);
      // Inisialisasi state untuk form edit
      setEditTitle(data.projectName);
      setEditDesc(data.description);
      setCanvasState(data.canvas);
    } catch (err) {
      setError('Gagal memuat proyek atau Anda tidak memiliki akses.');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleSaveDetails = async () => {
    try {
      const updatedProject = await updateProject(projectId, { 
        projectName: editTitle, 
        description: editDesc 
      });
      setProject(updatedProject);
      setIsEditingDetails(false); // Keluar dari mode edit
    } catch (err) {
      alert('Gagal menyimpan perubahan detail proyek.');
    }
  };
  
  const handleSaveCanvas = async () => {
    try {
      const updatedProject = await updateProject(projectId, { canvas: canvasState });
      setProject(updatedProject);
      alert('Perubahan pada Business Canvas berhasil disimpan!');
    } catch (err) {
      alert('Gagal menyimpan perubahan canvas.');
    }
  };

  const handleRequestMentorship = async () => {
    if (window.confirm('Apakah Anda yakin ingin meminta mentorship? Anda tidak bisa mengedit canvas lagi setelah ini.')) {
      try {
        const updatedProject = await requestMentorship(projectId);
        setProject(updatedProject);
      } catch (err) {
        alert('Gagal meminta mentorship.');
      }
    }
  };

  const handleAddFeedback = async (text) => {
    try {
      const updatedProject = await addFeedback(projectId, text);
      setProject(updatedProject);
    } catch (err) {
      alert('Gagal mengirim feedback.');
    }
  };

  const handleAcceptMentorship = async () => {
    try {
      const updatedProject = await acceptMentorship(projectId);
      setProject(updatedProject); // Perbarui state untuk menampilkan perubahan
    } catch (err) {
      alert('Gagal menerima proyek ini.');
    }
  };

  const handleCompleteProject = async () => {
    const makePublic = window.confirm('Proyek ini akan ditandai "Selesai". Apakah Anda juga ingin menampilkannya di Galeri Proyek publik?');
    try {
      const updatedProject = await completeProject(projectId, makePublic);
      setProject(updatedProject);
    } catch (err) {
      alert('Gagal menyelesaikan proyek.');
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat ruang kerja...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!project) return null;

  const isOwner = user?._id === project.submittedBy._id;
  const isTrainer = user?.role === 'trainer';
  const canEdit = isOwner && project.status === 'Draft';
  const canAccept = isTrainer && project.status === 'Menunggu Mentor';
  const isMentor = user?._id === project.mentor?._id;
  const canComplete = isMentor && project.status === 'Dalam Bimbingan';

  return (
    <div className="container mx-auto p-8">
      <Link to="/projects" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">&larr; Kembali ke Proyek Saya</Link>
      
      {/* --- BAGIAN DETAIL PROYEK YANG BISA DIEDIT --- */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-start">
          {isEditingDetails ? (
            <div className="flex-grow">
              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="text-3xl font-bold w-full border rounded p-1" />
              <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className="text-gray-600 mt-1 w-full border rounded p-1" rows="3"></textarea>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold">{project.projectName}</h1>
              <p className="text-gray-600 mt-1">{project.description}</p>
            </div>
          )}
          <div className="text-right flex-shrink-0 ml-4">
            <p className="font-semibold">Status: {project.status}</p>
            {project.mentor && <p className="text-sm text-gray-500">Mentor: {project.mentor.name}</p>}
            {canEdit && !isEditingDetails && (
              <button onClick={() => setIsEditingDetails(true)} className="text-sm text-blue-600 hover:text-blue-800 mt-2">Edit Detail</button>
            )}
          </div>
        </div>
        {isEditingDetails && (
          <div className="text-right mt-2 space-x-2">
            <button onClick={() => setIsEditingDetails(false)} className="px-3 py-1 bg-gray-200 rounded">Batal</button>
            <button onClick={handleSaveDetails} className="px-3 py-1 bg-indigo-600 text-white rounded">Simpan</button>
          </div>
        )}
        {canAccept && (
          <button onClick={handleAcceptMentorship} className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Terima Proyek Ini sebagai Mentor
          </button>
        )}
        {canEdit && (
          <button onClick={handleRequestMentorship} className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
            Minta Mentorship
          </button>
        )}
      </div>

      {/* --- BAGIAN BUSINESS CANVAS DENGAN TOMBOL SIMPAN --- */}
      {canvasState && (
        <BusinessCanvas
          canvasData={canvasState}
          onUpdate={setCanvasState} // Hanya update state lokal, bukan API
          isOwner={canEdit}
        />
      )}
      {canEdit && (
        <div className="mt-6 text-right">
          <button onClick={handleSaveCanvas} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Simpan Perubahan Canvas
          </button>
        </div>
      )}
      {canComplete && (
        <button onClick={handleCompleteProject} className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
          Selesaikan Proyek
        </button>
      )}

      <FeedbackThread
        feedback={project.feedback}
        onAddFeedback={handleAddFeedback}
        onRefresh={fetchProject}
      />
    </div>
  );
};

export default ProjectWorkspacePage;