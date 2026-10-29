// Нота аттары: кыргызча окулушу (До, Ре...) жана глобалдык (C, D...)
const LETTERS = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const SOLFEGE = ['До', 'До♯', 'Ре', 'Ре♯', 'Ми', 'Фа', 'Фа♯', 'Соль', 'Соль♯', 'Ля', 'Ля♯', 'Си'];

export const midiToFreq = (m) => 440 * 2 ** ((m - 69) / 12);
export const freqToMidi = (f) => 69 + 12 * Math.log2(f / 440);

export function noteInfo(midi) {
  const m = Math.round(midi);
  const i = ((m % 12) + 12) % 12;
  const octave = Math.floor(m / 12) - 1;
  return {
    midi: m,
    letter: LETTERS[i],
    solfege: SOLFEGE[i],
    octave,
    label: `${SOLFEGE[i]} (${LETTERS[i]})`,
  };
}

// Жыштыктан эң жакын нота жана центтик четтөө
export function nearestNote(freq) {
  const m = freqToMidi(freq);
  const r = Math.round(m);
  return { ...noteInfo(r), cents: Math.round((m - r) * 100), freq };
}

// tuning: tunings.js ичиндеги объект; s — кыл (0..2); n — жарым тон (позиция)
export const noteOf = (tuning, s, n) => noteInfo(tuning.strings[s].midi + n);
export const freqOf = (tuning, s, n) => midiToFreq(tuning.strings[s].midi + n);

export const NOTE_TABLE = [
  ['До', 'C'], ['Ре', 'D'], ['Ми', 'E'], ['Фа', 'F'], ['Соль', 'G'], ['Ля', 'A'], ['Си', 'B'],
];
