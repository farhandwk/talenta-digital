// frontend/src/data/riasecTest.js

// R = Realistic, I = Investigative, A = Artistic, S = Social, E = Enterprising, C = Conventional

export const questions = [
  { text: "Saya suka bekerja dengan peralatan atau mesin.", type: 'R' },
  { text: "Saya suka melakukan eksperimen atau penelitian.", type: 'I' },
  { text: "Saya suka membuat karya seni atau menulis kreatif.", type: 'A' },
  { text: "Saya suka membantu atau mengajar orang lain.", type: 'S' },
  { text: "Saya suka memimpin sebuah tim atau proyek.", type: 'E' },
  { text: "Saya suka bekerja dengan data yang terorganisir.", type: 'C' },
  { text: "Saya lebih suka bekerja di luar ruangan.", type: 'R' },
  { text: "Saya menikmati memecahkan masalah yang kompleks.", type: 'I' },
  { text: "Saya memiliki imajinasi yang kuat.", type: 'A' },
  { text: "Saya mudah bergaul dan suka bekerja dalam tim.", type: 'S' },
  { text: "Saya suka meyakinkan atau menjual ide kepada orang lain.", type: 'E' },
  { text: "Saya memperhatikan detail dan suka mengikuti prosedur.", type: 'C' },
  { text: "Saya terampil menggunakan perkakas tangan.", type: 'R' },
  { text: "Saya tertarik pada bidang sains dan teknologi.", type: 'I' },
  { text: "Saya tidak suka aturan yang terlalu kaku.", type: 'A' },
  { text: "Saya peduli dengan kesejahteraan orang lain.", type: 'S' },
  { text: "Saya ambisius dan suka mengambil risiko.", type: 'E' },
  { text: "Saya suka merencanakan sesuatu secara rinci.", type: 'C' },
];

export const results = {
  R: {
    title: "Tipe Realistis (The Doer)",
    description: "Anda adalah orang yang praktis, fisik, dan suka bekerja dengan tangan. Anda menikmati pekerjaan yang menghasilkan sesuatu yang nyata dan lebih suka berurusan dengan benda daripada ide atau orang.",
    careers: ["Insinyur Mesin", "Pilot", "Chef", "Teknisi Listrik", "Atlet Profesional"]
  },
  I: {
    title: "Tipe Investigatif (The Thinker)",
    description: "Anda adalah seorang pemikir yang analitis, intelektual, dan suka memecahkan masalah. Anda menikmati pekerjaan yang melibatkan penelitian, observasi, dan pemecahan masalah yang kompleks.",
    careers: ["Ilmuwan", "Dokter", "Programmer Komputer", "Analis Data", "Detektif"]
  },
  A: {
    title: "Tipe Artistik (The Creator)",
    description: "Anda adalah orang yang kreatif, imajinatif, dan ekspresif. Anda menikmati pekerjaan yang memungkinkan Anda untuk berinovasi, mengekspresikan diri, dan bekerja tanpa struktur yang kaku.",
    careers: ["Desainer Grafis", "Penulis", "Musisi", "Aktor", "Arsitek"]
  },
  S: {
    title: "Tipe Sosial (The Helper)",
    description: "Anda adalah orang yang suka menolong, ramah, dan peduli. Anda menikmati pekerjaan yang melibatkan interaksi dengan orang lain, seperti mengajar, memberi konseling, atau memberikan pelayanan.",
    careers: ["Guru", "Perawat", "Konselor", "Pekerja Sosial", "Manajer HR"]
  },
  E: {
    title: "Tipe Wirausaha (The Persuader)",
    description: "Anda adalah orang yang persuasif, ambisius, dan suka memimpin. Anda menikmati pekerjaan yang melibatkan pengaruh, persuasi, dan pencapaian tujuan organisasi atau ekonomi.",
    careers: ["Manajer Penjualan", "Pengusaha", "Pengacara", "Politisi", "Agen Real Estat"]
  },
  C: {
    title: "Tipe Konvensional (The Organizer)",
    description: "Anda adalah orang yang terorganisir, efisien, dan suka bekerja dengan data. Anda menikmati pekerjaan yang memiliki prosedur yang jelas dan melibatkan pengelolaan informasi atau data.",
    careers: ["Akuntan", "Analis Keuangan", "Pustakawan", "Sekretaris", "Auditor"]
  }
};