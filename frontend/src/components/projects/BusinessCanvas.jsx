// frontend/src/components/projects/BusinessCanvas.jsx

import React from 'react';

// Komponen kecil untuk setiap blok canvas
const CanvasBlock = ({ title, value, onChange }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <label className="block text-sm font-bold text-gray-700 mb-2">{title}</label>
    <textarea
      value={value || ''}
      onChange={onChange}
      className="w-full h-32 border border-gray-300 rounded-md p-2 text-sm"
      placeholder={`Isi ${title.toLowerCase()}...`}
    />
  </div>
);

const BusinessCanvas = ({ canvasData, onUpdate, isOwner }) => {
  const handleCanvasChange = (fieldName, value) => {
    onUpdate({ ...canvasData, [fieldName]: value });
  };

  const fields = [
    { key: 'customerSegments', title: '1. Segmen Pelanggan' },
    { key: 'valuePropositions', title: '2. Proposisi Nilai' },
    { key: 'channels', title: '3. Saluran' },
    { key: 'customerRelationships', title: '4. Hubungan Pelanggan' },
    { key: 'revenueStreams', title: '5. Arus Pendapatan' },
    { key: 'keyActivities', title: '6. Aktivitas Kunci' },
    { key: 'keyResources', title: '7. Sumber Daya Kunci' },
    { key: 'keyPartnerships', title: '8. Kemitraan Kunci' },
    { key: 'costStructure', title: '9. Struktur Biaya' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Business Model Canvas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map(field => (
          <CanvasBlock
            key={field.key}
            title={field.title}
            value={canvasData[field.key]}
            onChange={(e) => isOwner && handleCanvasChange(field.key, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessCanvas;