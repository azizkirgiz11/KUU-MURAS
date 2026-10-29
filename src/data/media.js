/*
  ╔═══════════════════════════════════════════════════════════════╗
  ║  БУЛ ЖЕРДЕ ӨЗҮҢҮЗДҮН ВИДЕО ЖАНА НОТА ФАЙЛДАРЫҢЫЗДЫ КОШОСУЗ  ║
  ╚═══════════════════════════════════════════════════════════════╝

  Ачкыч (key) — сабактын же күүнүн slug'ы (lessons.js / kuu.js ичинде).

  1) ВИДЕО (экөө тең болушу мүмкүн, сайт өзү алмаштыруу баскычын көрсөтөт):
     file:    '/media/videos/komuz-emne.mp4'   ← файлды public/media/videos/ ичине сал
     poster:  '/media/videos/komuz-emne.jpg'   ← видео же YouTube үчүн мукаба
     youtube: 'dQw4w9WgXcQ' же толук YouTube шилтемеси

  2) НОТАЛАР (PNG, JPG, SVG же PDF), файлды public/media/notes/ ичине сал:
     { title: 'Ноталар', src: '/media/notes/komuz-emne.svg' }
     Бир нече барак кошсоң болот: массивге дагы бир { title, src } кош.

  3) САНАРИП КОМУЗ (tab) — lessons.js / kuu.js ичинде 'tab' талаасы. Ал жерди толтурсаң,
     «Санарип комуз» күүнү автоматтык түрдө ойнотот жана ноталардын окулушун көрсөтөт.

  Төмөндө үлгү бар (комментарийден чыгарып, өзүңүздүкүнө алмаштырыңыз).
*/
export const MEDIA = {
  'komuz-emne': {
    video: { file: '', poster: '/media/videos/komuz-emne.png', youtube: '-CAG-4wj10Y&list=PPSV' },
   },
   'kerbez-1': { 
    video: { file: '', poster: '', youtube: '' },
    notation: [{ title: 'Кербез — ноталар', src: '../media/notes/kerbez.png' }, { title: 'Кербез — ноталар', src: '../media/notes/kerbez2.png' }],
  },
  'mash-botoi': { 
    video: { file: '', poster: '', youtube: 'zeD7TMjq-7g&list=RDzeD7TMjq-7g&start_radio=1' },
    notation: [{ title: 'Маш-ботой — ноталар', src: '../media/notes/mash-botoi.jpeg' }],
  },
  'koyron-kuu': { 
    video: { file: '', poster: '', youtube: 'teCdYRDaPT8&list=RDteCdYRDaPT8&start_radio=1' },
    notation: [{ title: 'Койрон-куу — ноталар', src: '../media/notes/koyron-kuu1.jpeg' }, { title: 'Койрон-куу — ноталар', src: '../media/notes/koyron-kuu2.jpeg' }],
  },
  'chaykama': { 
    video: { file: '', poster: '', youtube: 'tpj1NG72DsA&list=RDtpj1NG72DsA&start_radio=1' },
    notation: [{ title: 'Чайкама — ноталар', src: '../media/notes/chaykama.jpeg' }],
  },
  'kok-muzo': { 
    video: { file: '', poster: '', youtube: 'uDCeBA11sys' },
    notation: [{ title: 'Кок-музо — ноталар', src: '../media/notes/kok-muzo.jpeg' }],
  },
  'kyz-kerbez': { 
    video: { file: '', poster: '', youtube: '0Sxe6bwrBXY&list=RD0Sxe6bwrBXY&start_radio=1' },
    notation: [{ title: 'Кыз-кербез — ноталар', src: '../media/notes/kyz-kerbez.jpeg' }],
  },
  'altyn-balalyk': { 
    video: { file: '', poster: '', youtube: 'q1jl5_cTuQY&list=RDq1jl5_cTuQY&start_radio=1' },
    notation: [{ title: 'Алтын-балалык — ноталар', src: '../media/notes/altyn-balalyk1.jpeg' }, { title: 'Алтын-балалык — ноталар', src: '../media/notes/altyn-balalyk2.jpeg' }, { title: 'Алтын-балалык — ноталар', src: '../media/notes/altyn-balalyk3.jpeg' }],
  },



};

export const mediaFor = (slug) => MEDIA[slug] ?? {};
