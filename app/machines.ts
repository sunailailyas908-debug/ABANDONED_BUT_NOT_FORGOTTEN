import type { ModelHotspot, ModelStatus, Setting } from '../src/components/ModelViewer';

// Facts for the demo page. Name, date, place, status and purpose are copied from the team's
// missions.json. The part descriptions are this role's own wording and need the fact-checker.
export interface Machine {
  id: 'opportunity' | 'lrv' | 'ingenuity';
  tab: string;
  name: string;
  date: string;
  location: string;
  status: ModelStatus;
  job: string;
  setting: Setting;
  alt: string;
  hotspots: ModelHotspot[];
  /** Who made the 3D model, and where it came from. */
  credit: { text: string; href?: string; linkText?: string };
}

const GITHUB_3D = 'https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Models/';

export const MACHINES: Machine[] = [
  {
    id: 'lrv',
    tab: 'Lunar Roving Vehicle',
    name: 'Apollo Lunar Roving Vehicle (LRV)',
    date: '1971-07-30',
    location: 'Moon (Hadley Rille / Descartes / Taurus-Littrow)',
    status: 'inactive',
    job: 'Provide mobility for Apollo astronauts on the lunar surface to extend exploration range and sample collection.',
    setting: 'moon',
    alt: 'A simplified model of the Apollo Lunar Roving Vehicle: an open frame with four wire-mesh wheels, two seats and an umbrella-shaped antenna.',
    hotspots: [
      { id: 'dish', label: 'Umbrella antenna', description: 'Pointed at Earth to send TV pictures and radio from the Moon.', position: [0.62, 0.52, 0] },
      { id: 'camera', label: 'TV camera', description: 'Sent live pictures of the astronauts at work back to Earth.', position: [0.93, 0.02, 0] },
      { id: 'controller', label: 'Hand controller', description: 'One T-shaped handle between the seats steered and drove the rover.', position: [0.2, 0.08, 0] },
      { id: 'wheels', label: 'Wire-mesh wheels', description: 'Woven wire tyres with metal treads gripped the dusty Moon ground and kept the weight down.', position: [0.65, -0.37, 0.64] },
    ],
    credit: { text: 'Simplified 3D model built by Team UA VEYLORA. It is not a NASA model.' },
  },
  {
    id: 'opportunity',
    tab: 'Opportunity rover',
    name: 'Opportunity Rover',
    date: '2004-01-24',
    location: 'Mars (Meridiani Planum)',
    status: 'inactive',
    job: 'Search for geological evidence of ancient liquid water and assess past Martian habitability.',
    setting: 'mars',
    alt: 'The Opportunity rover: a gold-coloured body with a solar deck, a tall camera mast and six wheels.',
    hotspots: [
      { id: 'pancam', label: 'Panoramic camera', description: 'Twin cameras on the mast that took the wide pictures of Mars.', position: [0.0, 0.6, -0.25] },
      { id: 'arm', label: 'Robotic arm', description: 'Holds the tools that touch and study rocks up close.', position: [0.03, -0.26, 0.92] },
      { id: 'wheels', label: 'Six wheels', description: 'Each wheel has its own motor, and the suspension helps the rover roll over small rocks.', position: [0.56, -0.48, -0.37] },
    ],
    credit: {
      text: '3D model by NASA, from NASA 3D Resources. Resized and compressed for the web.',
      href: `${GITHUB_3D}Mars%20Exploration%20Rover%20-%20Opportunity%20(MER-B)`,
      linkText: 'Open the NASA model page',
    },
  },
  {
    id: 'ingenuity',
    tab: 'Ingenuity helicopter',
    name: 'Ingenuity Mars Helicopter',
    date: '2021-02-18',
    location: 'Mars (Jezero Crater)',
    status: 'silent',
    job: 'Demonstrate powered, controlled flight in the extremely thin Martian atmosphere.',
    setting: 'mars',
    alt: 'The Ingenuity helicopter: a small box body with two rotors stacked above it, a solar panel on top and four legs.',
    hotspots: [
      { id: 'rotors', label: 'Two rotors', description: 'Spin in opposite directions, very fast, because the air on Mars is so thin.', position: [0, 0.3, 0] },
      { id: 'solar', label: 'Solar panel', description: 'Charged the battery that kept the helicopter warm at night.', position: [0, 0.53, 0] },
      { id: 'legs', label: 'Landing legs', description: 'Four legs that cushioned each landing.', position: [0.35, -0.48, 0.36] },
    ],
    credit: {
      text: '3D model by NASA, from NASA 3D Resources. Resized and compressed for the web.',
      href: `${GITHUB_3D}Ingenuity%20Mars%20Helicopter`,
      linkText: 'Open the NASA model page',
    },
  },
];

const STATUS_TEXT: Record<ModelStatus, string> = { inactive: 'Inactive', silent: 'Silent', operating: 'Still operating' };
const STATUS_GLYPH: Record<ModelStatus, string> = { inactive: '■', silent: '◌', operating: '●' };
export const statusText = (s: ModelStatus) => `${STATUS_GLYPH[s]} ${STATUS_TEXT[s]}`;

// "1971-07-30" → "July 30, 1971", in UTC so the day never shifts with the visitor's time zone.
export function formatDate(value: string): string {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
