// Definiert die Strunktur eines Teams
export interface Team {
  name: string;
  player1: string;
  player2: string;
}

// Definiert einen Zustand (wird in der reducer-index im "State" der Eigenschaft "tournament" zugewiesesn)
export interface TournamentState {
  teams: Team[];
  teamNames: string[];
  player: string[];
}

// Vordefinierte Team Namen
export const teamNames: string[] = [
  'Terrifying Metal Wipeout',
  'Outer Steel Squall',
  'Streetwise Sweat Savages',
  'The Pinewoods Ramblers',
  'Watery Enchiladas',
  'Streaking Liberty Hatters',
  'The Chillers',
  'Savage Thunder Pussies'
];

// Teilnehmer
export const player: string[] = [
  'Carina',
  'Marcel',
  'Marcus',
  'Maik',
  'Fouad',
  'Peter',
  'Björn',
  'Alex',
  'Friedrich',
  'Lukas',
  'Carsten',
  'Norman'
]
