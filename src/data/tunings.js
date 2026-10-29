// midi: 62 = Ре (D4), 69 = Ля (A4), 67 = Соль (G4)
// Эки четки кыл бирдей, ортоңку кыл алардан квинта же кварта аралыкта.
// TODO: өзүңүздүн мугалимиңиз колдонгон күүлөөнү текшерип, керек болсо midi сандарын өзгөртүңүз.
export const TUNINGS = {
  kvinta: {
    id: 'kvinta',
    name: 'Квинта күүлөө (Ре–Ля–Ре)',
    desc: 'Ортоңку кыл четки кылдардан квинта жогору.',
    strings: [
      { midi: 62, label: 'I кыл' },
      { midi: 69, label: 'II кыл (ортоңку)' },
      { midi: 62, label: 'III кыл' },
    ],
  },
  kvarta: {
    id: 'kvarta',
    name: 'Кварта күүлөө (Ми–Ля–Ми)',
    desc: 'Ортоңку кыл четки кылдардан кварта жогору.',
    strings: [
      { midi: 64, label: 'I кыл' },
      { midi: 69, label: 'II кыл (ортоңку)' },
      { midi: 64, label: 'III кыл' },
    ],
  },
  kvarta1: {
    id: 'kvarta1',
    name: 'Кварта күүлөө (Ми–Ля–Ре)',
    desc: 'Ортоңку кыл четки кылдардан кварта жогору.',
    strings: [
      { midi: 64, label: 'I кыл' },
      { midi: 69, label: 'II кыл (ортоңку)' },
      { midi: 62, label: 'III кыл' },
    ],
  },
  kvarta2: {
    id: 'kvarta2',
    name: 'Кварта күүлөө (Ре–Ля–Ля)',
    desc: 'Ортоңку кыл четки кылдардан кварта жогору.',
    strings: [
      { midi: 62, label: 'I кыл' },
      { midi: 69, label: 'II кыл (ортоңку)' },
      { midi: 69, label: 'III кыл' },
    ],
  },
};
export const DEFAULT_TUNING = 'kvinta';
