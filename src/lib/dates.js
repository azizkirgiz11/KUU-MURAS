// Комуз күнү: жыл сайын 9-сентябрь
export function komuzDayInfo(now = new Date()) {
  const y = now.getFullYear();
  const today = new Date(y, now.getMonth(), now.getDate());
  let target = new Date(y, 8, 9);
  if (today > target) target = new Date(y + 1, 8, 9);
  const days = Math.round((target - today) / 864e5);
  return { days, isToday: days === 0, year: target.getFullYear() };
}

export function dayOfYear(now = new Date()) {
  return Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 864e5);
}
