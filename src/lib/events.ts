export type CityEvent = {
  id: string; // slug or city id
  city: string;
  startsAt: string; // ISO string
  endsAt: string; // ISO string
  link?: string; // optional Luma link
};

// TODO: Replace dates below with real Lu.ma event times.

export const cityEvents: CityEvent[] = [
  {
    id: 'galle',
    city: 'Galle',
    startsAt: '2025-09-17T09:00:00+05:30', // Sep 17, 9:00 AM IST
    endsAt: '2025-09-17T17:00:00+05:30',
    link: 'https://lu.ma/CeyCashEvents',
  },
  {
    id: 'colombo',
    city: 'Colombo',
    startsAt: '2025-09-20T09:00:00+05:30', // Sep 20, 9:00 AM IST
    endsAt: '2025-09-20T17:00:00+05:30',
    link: 'https://lu.ma/CeyCashEvents',
  },
  {
    id: 'kandy',
    city: 'Kandy',
    startsAt: '2025-09-28T09:00:00+05:30', // Sep 28, 9:00 AM IST
    endsAt: '2025-09-28T17:00:00+05:30',
    link: 'https://lu.ma/CeyCashEvents',
  },
  {
    id: 'ella',
    city: 'Ella',
    startsAt: '2025-10-12T10:00:00+05:30', // Oct 12, 10:00 AM IST
    endsAt: '2025-10-12T18:00:00+05:30',
    link: 'https://lu.ma/CeyCashEvents',
  },
];
