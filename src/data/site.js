// Site-wide settings. PLACEHOLDERS: replace phone, WhatsApp number, address and hours with real details.
export const site = {
  name: 'Sports Wings Private Limited',
  short: 'Sports Wings',
  currency: 'Rs.',
  placeholderPhotos: true, // online stock photos until real photos exist. Set false to show illustrations only.
  whatsapp: '94770000000', // international format, no plus sign
  phone: '+94 77 000 0000',
  email: 'hello@sportswings.lk',
  address: ['No. 00, Galle Road', 'Colombo 03, Sri Lanka'],
  hours: [['Monday to Saturday', '9:30 am to 7:00 pm'], ['Sunday', '10:00 am to 4:00 pm']],
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sports+Wings+Colombo',
  social: { instagram: 'https://instagram.com/', facebook: 'https://facebook.com/', youtube: 'https://youtube.com/' },
};

// Sample bulk pricing for clubs and schools (per full kit).
export const kitTiers = [
  { qty: '10 to 24 kits', price: 6900, note: 'Shirt and trousers, one colour way' },
  { qty: '25 to 59 kits', price: 6200, note: 'Adds player names and numbers' },
  { qty: '60 kits or more', price: 5600, note: 'Adds training tops and caps' },
];

// The four things we check on every bat.
export const batGuide = [
  { title: 'Willow grade', text: 'Grade 1 has the cleanest face and the most even grain. Grade 3 and 4 play well and cost far less. Kashmir willow is the right start for juniors and tape-ball.' },
  { title: 'Weight', text: 'Most adult bats sit between 1,100 and 1,250 g. Pick the heaviest bat you can lift and swing without your top hand dropping.' },
  { title: 'Pick-up', text: 'Pick-up is where the weight feels centred. A high pick-up suits quick hands and front-foot players. A low pick-up gives power through the ball.' },
  { title: 'Handle', text: 'Short handle for players under about 5 ft 9 in. Long handle if you are taller or want more leverage. Oval handles are the most common.' },
];
