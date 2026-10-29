export const NAV = [
  { to: '/', label: 'Башкы бет', icon: 'home', end: true },
  { to: '/sabaktar', label: 'Сабактар', icon: 'book' },
  { to: '/kuu', label: 'Күүлөр', icon: 'note' },
  { to: '/komuz', label: 'Комуз', icon: 'komuz' },
  { to: '/aspaptar', label: 'Аспаптар', icon: 'hand' },
  { to: '/akort', label: 'Күүлөгүч', icon: 'tuner' },
  { to: '/progress', label: 'Менин жолум', icon: 'clock' },
  { to: '/about', label: 'Долбоор жөнүндө', icon: 'info' },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Үйрөнүү',
    links: [
      { to: '/sabaktar', label: 'Бардык сабактар' },
      { to: '/sabaktar/komuz-emne', label: 'Биринчи сабак' },
      { to: '/kuu', label: 'Күүлөр китепканасы' },
      { to: '/akort', label: 'Күүлөгүч' },
    ],
  },
  {
    title: 'Комуз',
    links: [
      { to: '/komuz', label: 'Комуз деген эмне' },
      { to: '/komuz#tuzulush', label: 'Түзүлүшү' },
      { to: '/komuz#tarykh', label: 'Тарыхы' },
      { to: '/komuz#komuzchular', label: 'Улуу комузчулар' },
      { to: '/aspaptar', label: 'Башка аспаптар' },
    ],
  },
  {
    title: 'Сайт',
    links: [
      { to: '/about', label: 'Долбоор жөнүндө' },
      { to: '/progress', label: 'Менин жолум' },
      { to: '/kirish', label: 'Кирүү / Катталуу' },
    ],
  },
];
