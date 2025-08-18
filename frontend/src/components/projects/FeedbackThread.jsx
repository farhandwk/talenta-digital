// frontend/src/components/projects/FeedbackThread.jsx

import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

const FeedbackThread = ({ feedback, onAddFeedback, onRefresh }) => {
  const [newFeedback, setNewFeedback] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFeedback.trim()) {
      onAddFeedback(newFeedback);
      setNewFeedback('');
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Diskusi & Feedback</h2>
        <button onClick={onRefresh} title="Muat ulang feedback" className="text-gray-500 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {feedback.length > 0 ? (
            feedback.map(item => (
              <div key={item._id} className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-800">{item.text}</p>
                <p className="text-xs text-gray-500 mt-2 text-right">
                  - {item.author?.name || 'Anonim'} pada {new Date(item.createdAt).toLocaleString('id-ID')}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada feedback.</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-4 border-t pt-4">
          <textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            placeholder="Tulis feedback atau pertanyaan Anda..."
            rows="3"
            required
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackThread;