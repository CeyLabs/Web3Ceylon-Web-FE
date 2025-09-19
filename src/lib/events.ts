export type CityEvent = {
  id: string; // slug or city id
  city: string;
  startsAt: string; // ISO string
  endsAt: string; // ISO string
  link?: string; // optional Luma link
  image?: string; // small square badge image
};

// TODO: Replace dates below with real Lu.ma event times.

export const cityEvents: CityEvent[] = [
  {
    id: 'colombo',
    city: 'Colombo',
    startsAt: '2025-09-20T09:00:00+05:30', // Sep 20, 9:00 AM IST
    endsAt: '2025-09-20T17:00:00+05:30',
    link: 'https://luma.com/8kg58fcg',
    image: '/assets/events/Colombo_GBG.png',
  },
  {
    id: 'kandy',
    city: 'Kandy',
    startsAt: '2025-09-28T09:00:00+05:30', // Sep 28, 9:00 AM IST
    endsAt: '2025-09-28T17:00:00+05:30',
    link: 'https://luma.com/nfwqhe8u',
    image: '/assets/events/Kandy_GBG.png',
  },
   {
    id: 'galle',
    city: 'Galle',
    startsAt: '2025-10-08T09:00:00+05:30', // Oct 8, 9:00 AM IST
    endsAt: '2025-10-08T17:00:00+05:30',
    link: 'https://luma.com/qrggf436',
    image: '/assets/events/Galle_GBG.png',
  },
  {
    id: 'ella',
    city: 'Ella',
    startsAt: '2025-10-12T10:00:00+05:30', // Oct 12, 10:00 AM IST
    endsAt: '2025-10-12T18:00:00+05:30',
    link: 'https://luma.com/1abnpfkw',
    image: '/assets/events/Ella_GBG.png',
  },
];
