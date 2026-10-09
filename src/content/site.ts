/**
 * All site copy lives here. Swap freely.
 *
 * Headline conventions
 * - Headlines are arrays of lines; each line reveals on its own.
 * - Wrap ONE accent word per headline in *asterisks* to set it in italic.
 *
 * Image conventions
 * - `image` keys map to /public/images/<key>.jpg. Drop a real photo in with
 *   that filename and it replaces the placeholder automatically on next build.
 * - `label` is the small-caps note shown on the placeholder (what to shoot).
 */

export type Img = { key: string; label: string; alt: string; ratio?: string };

export const hotel = {
  name: '[Hotel Name]',
  place: 'Kalimpong',
  altitude: '1,250 m',
  address: ['[Road / landmark]', 'Kalimpong, West Bengal 734301', 'India'],
  email: 'stay@[hotel-domain].com',
  phoneDisplay: '+91 00000 00000',
  /** Digits only, with country code, for wa.me links. */
  whatsapp: '910000000000',
  whatsappMessage: 'Hello, I would like to ask about a stay.',
  instagram: 'https://instagram.com/[handle]',
  instagramHandle: '@[handle]',
  bookingUrl: 'https://booking.example.com/[hotel-name]',
};

export const whatsappHref = (text = hotel.whatsappMessage) =>
  `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/a-day-here', label: 'A day here' },
  { href: '/kalimpong', label: 'Kalimpong' },
  { href: '/the-table', label: 'The table' },
  { href: '/getting-here', label: 'Getting here' },
];

export const ui = {
  stay: 'Stay with us',
  bookTitle: 'Stay with us',
  bookIntro: 'Tell us when. We will hold the kettle.',
  arrival: 'Arrival',
  departure: 'Departure',
  adults: 'Adults',
  children: 'Children',
  checkRates: 'Check rates',
  whatsapp: 'Ask on WhatsApp',
  menu: 'Menu',
  close: 'Close',
  from: 'from',
  perNight: 'a night',
  book: 'Book',
  bookAgain: 'Stay again',
  skip: 'Skip to content',
};

/* ------------------------------------------------------------------ */
/* Rooms                                                              */
/* ------------------------------------------------------------------ */

export type Room = {
  slug: string;
  name: string;
  from: string;
  size: string;
  bed: string;
  view: string;
  line: string;
  headline: string[];
  body: string[];
  images: Img[];
};

export const rooms: Room[] = [
  {
    slug: 'valley-room',
    name: 'Valley Room',
    from: '₹6,500',
    size: '28 m²',
    bed: 'Queen',
    view: 'West, over the Teesta valley',
    line: 'A window bench, and the valley going blue at dusk.',
    headline: ['The valley, from', 'a window *bench.*'],
    body: [
      'The room faces west. Mornings are soft and pale; the light comes late and stays long, until the valley goes blue.',
      'Wool blankets, a writing desk, a kettle and a tin of first-flush. That is most of it.',
    ],
    images: [
      { key: 'valley-room-1', label: 'Valley Room — window bench, morning', alt: 'A window bench with cushions looking west over the Teesta valley' },
      { key: 'valley-room-2', label: 'Valley Room — bed, wool blanket', alt: 'A made bed with a folded wool blanket in soft light' },
      { key: 'valley-room-3', label: 'Valley Room — desk, kettle, tea tin', alt: 'A small wooden desk with a kettle and a tin of tea' },
      { key: 'valley-room-4', label: 'Valley Room — view at dusk', alt: 'The Teesta valley turning blue at dusk' },
      { key: 'valley-room-5', label: 'Valley Room — bathroom, stone', alt: 'A simple stone-lined bathroom' },
    ],
  },
  {
    slug: 'ridge-suite',
    name: 'Ridge Suite',
    from: '₹9,800',
    size: '42 m²',
    bed: 'King',
    view: 'Deolo ridge and the valley',
    line: 'A wood stove, a deep bath, the long line of the ridge.',
    headline: ['A stove lit', 'before you *ask.*'],
    body: [
      'The largest room, at the top of the house. Deolo sits in the east window; the Teesta in the other.',
      'A wood stove we light at dusk. A deep bath. A sofa long enough to sleep on, which people do.',
    ],
    images: [
      { key: 'ridge-suite-1', label: 'Ridge Suite — east window, Deolo', alt: 'A wide window framing the forested Deolo ridge' },
      { key: 'ridge-suite-2', label: 'Ridge Suite — wood stove, lit', alt: 'A lit wood stove beside a reading chair' },
      { key: 'ridge-suite-3', label: 'Ridge Suite — king bed, linen', alt: 'A king bed made with pale linen' },
      { key: 'ridge-suite-4', label: 'Ridge Suite — deep bath', alt: 'A deep bath beside a small window' },
      { key: 'ridge-suite-5', label: 'Ridge Suite — sofa, books', alt: 'A long sofa with a stack of books' },
      { key: 'ridge-suite-6', label: 'Ridge Suite — morning cloud', alt: 'Cloud lying in the valley below the suite' },
    ],
  },
  {
    slug: 'garden-cottage',
    name: 'Garden Cottage',
    from: '₹8,200',
    size: '36 m²',
    bed: 'King or twin',
    view: 'The garden, ferns and orchids',
    line: 'A small house of its own, down the fern path.',
    headline: ['A small house', 'down the *path.*'],
    body: [
      'Down the stone path, past the orchids Kalimpong is known for. A cottage of its own, with a porch.',
      'Quieter than the house, closer to the birds. Good for long stays and longer books.',
    ],
    images: [
      { key: 'garden-cottage-1', label: 'Garden Cottage — porch, ferns', alt: 'A small cottage porch surrounded by ferns' },
      { key: 'garden-cottage-2', label: 'Garden Cottage — stone path', alt: 'A stone path winding through a garden' },
      { key: 'garden-cottage-3', label: 'Garden Cottage — bedroom', alt: 'A calm bedroom with a garden window' },
      { key: 'garden-cottage-4', label: 'Garden Cottage — orchids, close', alt: 'Orchids in bloom close up' },
      { key: 'garden-cottage-5', label: 'Garden Cottage — porch chair, tea', alt: 'A porch chair with a cup of tea' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Homepage                                                           */
/* ------------------------------------------------------------------ */

export const home = {
  meta: {
    title: '[Hotel Name], Kalimpong',
    description: 'A quiet house above the Teesta, on the ridge between Deolo and Durpin in Kalimpong.',
  },
  /** Opening sequence: each phrase blurs in and out before the hero appears. */
  intro: ['Above the *plains,*', 'inside the *cloud,*'],
  hero: {
    label: 'Kalimpong · 1,250 m',
    headline: ['A quiet house', 'above the *Teesta.*'],
    /** Under 3 MB, H.264 MP4 (+ optional WebM). Leave the files out and the poster stays. */
    video: { mp4: '/video/dawn.mp4', webm: '/video/dawn.webm' },
    poster: { key: 'hero-poster', label: 'Dawn — deck, mist', alt: 'Cloud lifting off the ridge at dawn, seen from the deck' },
  },
  arrival: {
    label: 'Arrival',
    text: 'The road climbs out of the plains, the air turns cool, and somewhere past the last bend the cloud opens. You’re here.',
    image: { key: 'arrival', label: 'Arrival — window, pines in mist', alt: 'A wooden window looking out at pines and drifting mist' },
  },
  story: {
    label: 'A story of the ridge',
    headline: ['From the river, *up.*'],
    intro: 'One road, about three hours, and a thousand metres of climbing between the water and the house.',
    chapters: [
      {
        title: 'The river',
        heading: 'The *river*',
        altitude: 210,
        text: 'It begins far below, at the Teesta. Jade water, loud on its stones, and the air still warm from the plains.',
        image: { key: 'story-river', label: 'Story — the Teesta from above', alt: 'The Teesta river winding through a forested valley under mist' },
      },
      {
        title: 'The climb',
        heading: 'The *climb*',
        altitude: 600,
        text: 'The road leaves the river and starts to climb. Pine, then cardamom, then pine again. Someone rolls the windows down.',
        image: { key: 'story-climb', label: 'Story — the road through the pines', alt: 'A narrow road with a stone wall climbing in bends through tall pines into mist' },
      },
      {
        title: 'The cloud',
        heading: 'Into the *cloud*',
        altitude: 950,
        text: 'Halfway up, you drive into the cloud. The engine sounds softer. So does everyone in the car.',
        image: { key: 'story-cloud', label: 'Story — prayer flags in the cloud', alt: 'Faded prayer flags strung between trees, disappearing into thick white cloud beside a wet road' },
      },
      {
        title: 'The ridge',
        heading: 'The *ridge*',
        altitude: 1250,
        text: 'Then it opens. Kalimpong lies along its saddle between Deolo and Durpin, with the snows behind it on a clear day.',
        image: { key: 'story-ridge', label: 'Story — Kalimpong along the ridge', alt: 'White houses strung along a forested ridge, with snow peaks above a band of cloud' },
      },
      {
        title: 'The house',
        heading: 'The *house*',
        altitude: 1250,
        text: 'At the end of a lane, a lamp is on and so is the kettle. Put your bag down. Stay a while.',
        image: { key: 'story-house', label: 'Story — tea on the rail', alt: 'A cup of tea steaming on a wooden deck rail, mist lifting off the hills at dawn' },
      },
    ],
  },
  vista: {
    image: { key: 'vista', label: 'Vista — snows above a sea of cloud', alt: 'Snow peaks rising above a sea of cloud at sunrise, pines in the foreground' },
    headline: ['Stay a', '*while.*'],
    note: 'Some mornings the whole valley fills with cloud and the house floats above it.',
  },
  dusk: {
    line: 'And then the lights come on across the valley.',
  },
  rooms: {
    label: 'Rooms',
    headline: ['Three rooms,', 'three *windows.*'],
  },
  day: {
    label: 'A day here',
    headline: ['A day, *unhurried.*'],
    moments: [
      { time: 'Dawn', hour: '6 a.m.', text: 'Tea on the deck while the ridge appears.' },
      { time: 'Noon', hour: '12 p.m.', text: 'A walk to Durpin.' },
      { time: 'Dusk', hour: '6 p.m.', text: 'A fire, and nothing to do.' },
    ],
    image: { key: 'day-noon', label: 'Noon — Durpin monastery', alt: 'Durpin monastery, white with a gilded roof, among pines in soft cloud' },
  },
  around: {
    label: 'Around Kalimpong',
    headline: ['The ridge, *walked.*'],
    hint: 'Choose a place on the ridge.',
  },
  table: {
    label: 'The table',
    image: { key: 'table', label: 'Table — breakfast, window light', alt: 'Breakfast laid on a wooden table in window light' },
    line: 'Breakfast is whatever came up from the Haat Bazaar that morning, and the tea is poured twice.',
  },
  gettingHere: {
    label: 'Getting here',
    headline: ['The road *up.*'],
    text: 'Fly into Bagdogra. We’ll meet you there; the drive up takes about three hours.',
    train: 'By train, come to New Jalpaiguri (NJP). Same road, much the same drive.',
  },
};

/* ------------------------------------------------------------------ */
/* Around Kalimpong: places, each with a note and a photograph       */
/* ------------------------------------------------------------------ */

export const places = [
  {
    id: 'deolo',
    name: 'Deolo Hill',
    meta: 'The high point · about 1,700 m',
    note: 'Walk up before breakfast. On a clear morning the Teesta shows far below, and the snows sit along the north.',
    image: { key: 'place-deolo', label: 'Deolo — morning view north', alt: 'Snow peaks above cloud seen from a high ridge at sunrise' },
  },
  {
    id: 'durpin',
    name: 'Durpin Monastery',
    meta: 'Zang Dhok Palri Phodang',
    note: 'On the Durpin side of the ridge. Go at prayer hour, leave your shoes at the door and sit at the back.',
    image: { key: 'place-durpin', label: 'Durpin — monastery in cloud', alt: 'A forested hilltop half-hidden in cloud' },
  },
  {
    id: 'morgan',
    name: 'Morgan House',
    meta: 'A 1930s stone house',
    note: 'Ivy over grey stone and a long lawn. Tea in the garden is the whole point of going.',
    image: { key: 'place-morgan', label: 'Morgan House — garden window', alt: 'An old window looking out over green hills' },
  },
  {
    id: 'haat',
    name: 'Haat Bazaar',
    meta: 'Wednesdays and Saturdays',
    note: 'Cheese, chillies, brooms, bolts of cloth. Go early, go hungry, carry small notes.',
    image: { key: 'place-haat', label: 'Haat Bazaar — morning market', alt: 'A hillside town on a forested slope above the valley' },
  },
];

/* ------------------------------------------------------------------ */
/* Inner pages                                                        */
/* ------------------------------------------------------------------ */

export const roomsPage = {
  meta: { title: 'Rooms', description: 'Three rooms at [Hotel Name], Kalimpong: the Valley Room, the Ridge Suite and the Garden Cottage.' },
  label: 'Rooms',
  headline: ['Three rooms,', 'three *windows.*'],
  intro: 'Each room looks at something different: the valley, the ridge, the garden. Choose by what you’d like to wake up to.',
};

export const dayPage = {
  meta: { title: 'A day here', description: 'Dawn, noon and dusk at [Hotel Name], Kalimpong.' },
  label: 'A day here',
  headline: ['A day, *unhurried.*'],
  intro: 'There is no schedule. These are only the things guests tend to end up doing.',
  moments: [
    {
      time: 'Dawn',
      hour: '6 a.m.',
      line: 'Tea on the deck while the ridge appears.',
      body: 'The cloud sits in the valley until the sun finds it. Blankets are by the door. The first pot is already on.',
      image: { key: 'day-dawn', label: 'Dawn — deck, mist', alt: 'A teacup on the deck rail as the mist lifts off the ridge' },
    },
    {
      time: 'Noon',
      hour: '12 p.m.',
      line: 'A walk to Durpin.',
      body: 'About an hour along the ridge road, past nurseries and school gates, to the monastery on the hill.',
      image: { key: 'day-noon', label: 'Noon — ridge road, prayer flags', alt: 'Prayer flags along the ridge road at midday' },
    },
    {
      time: 'Dusk',
      hour: '6 p.m.',
      line: 'A fire, and nothing to do.',
      body: 'The lights come on across the valley in Sikkim. Someone brings soup. That is the evening.',
      image: { key: 'day-dusk', label: 'Dusk — fire, valley lights', alt: 'A fire burning low with valley lights beyond' },
    },
  ],
};

export const kalimpongPage = {
  meta: { title: 'Kalimpong', description: 'Deolo, Durpin, Morgan House and the Teesta: a short guide to Kalimpong from [Hotel Name].' },
  label: 'Kalimpong',
  headline: ['A town on a *ridge.*'],
  intro: 'Kalimpong sits on a saddle between Deolo and Durpin, with the Teesta far below. Everything worth seeing is a walk or a short drive.',
  more: [
    { name: 'The nurseries', note: 'Kalimpong grows orchids and cacti for half of India. Most will let you wander.' },
    { name: 'Teesta Bazaar', note: 'Down at the river, an hour below. Go for the water, not the town.' },
  ],
  image: { key: 'kalimpong-town', label: 'Kalimpong — town from the ridge', alt: 'Kalimpong town spread along the ridge, seen from above' },
};

export const tablePage = {
  meta: { title: 'The table', description: 'The kitchen at [Hotel Name], Kalimpong: market produce, local cheese, Darjeeling tea.' },
  label: 'The table',
  headline: ['What the hill *grows.*'],
  line: 'Breakfast is whatever came up from the Haat Bazaar that morning, and the tea is poured twice.',
  body: [
    'Squash shoots, river greens, Kalimpong cheese. Dal the way the house has always made it.',
    'Dinner is one table, one menu, at eight. Tell us what you don’t eat; we’ll do the rest.',
  ],
  images: [
    { key: 'table', label: 'Table — breakfast, window light', alt: 'Breakfast laid on a wooden table in window light' },
    { key: 'table-market', label: 'Market — Haat Bazaar, greens', alt: 'Bundles of greens at the Haat Bazaar' },
    { key: 'table-tea', label: 'Tea — second pour', alt: 'Tea being poured into a small cup' },
  ],
};

export const gettingHerePage = {
  meta: { title: 'Getting here', description: 'How to reach [Hotel Name] in Kalimpong from Bagdogra airport or NJP railway station.' },
  label: 'Getting here',
  headline: ['The road *up.*'],
  intro: 'Fly into Bagdogra. We’ll meet you there; the drive up takes about three hours.',
  ways: [
    { label: 'By air', title: 'Bagdogra (IXB)', text: 'We meet you at arrivals with a sign and a flask. Roughly three hours up, along the Teesta.' },
    { label: 'By train', title: 'New Jalpaiguri (NJP)', text: 'The nearest big station. Much the same road, much the same drive.' },
    { label: 'By road', title: 'From Siliguri', text: 'Take the Teesta road via Sevoke and climb at Teesta Bazaar. Message us when you pass the bridge.' },
  ],
  image: { key: 'getting-here-road', label: 'Road — Teesta, the climb', alt: 'The road climbing above the Teesta river' },
  note: 'Roads close sometimes in the monsoon. We will always tell you before you leave.',
};

export const footer = {
  line: ['Come back when', 'the cloud *does.*'],
};
