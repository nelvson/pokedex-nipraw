export const PROGRESS_BAR = {
  STAT: {
    hp: '#dd4444',
    attack: '#0f0f0f',
    defense: '#66cdaa',
    'special-attack': '#dd99ff',
    'special-defense': '#008000',
    speed: '#2255ff',
  },
  TEXT: '#fff',
};

export const TAG = {
  types: '#66cdaa',
  move: '#468499',
};

export type ProgressBarStat = keyof typeof PROGRESS_BAR.STAT;
