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
};

export const mediaFor = (slug) => MEDIA[slug] ?? {};
