// Curated direct image URLs: no random-photo redirects or unrelated keyword matches.
import { site } from '../data/site.js';

const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;
const cricket = 'https://cdn.shopify.com/s/files/1/0012/8797/9121/files/';
const photos = {
  bat: [
    `${cricket}CACD26English_20Willow_20Bats_20Neocore_20500_20Players_20Bat_20Rear_20Right_ad71d131-fe82-4b0d-8563-76261fcd66b7.jpg?width=1000`,
    `${cricket}CAFB26EnglishWillowBatsHavoc1.0ProEditionBat_Rear_f3e6f4d5-3c58-405a-bb62-b35097af3956.jpg?width=1000`,
  ],
  helmet: [`${cricket}5507904HelmetAtomic360NavyMain_64ea7245-1b3f-4359-9bdd-3f836682fd4a.jpg?width=1000`],
  ball: [
    'https://cdn.shopify.com/s/files/1/0012/8797/9121/products/CDAD17Ball_20Crest_205_20Star_20156g_20Back.jpg?width=1000',
    'https://cdn.shopify.com/s/files/1/0012/8797/9121/products/2600_20CDAG19_205111404_20Ball_20Crest_20Legend_20142g_20White_20Front.jpg?width=1000',
  ],
  pads: [`${cricket}CLAC25Legguards_20Classic_20Prestige_20Batting_20Pad_20Pair.jpg?width=1000`],
  gloves: [`${cricket}CGBB25Batting_20Gloves_20Classic_20Pro_20Performance_20Glove_20Main.jpg?width=1000`],
  cricket: [unsplash('photo-1758791184255-411236a49346')],
  football: [unsplash('photo-1614632537190-23e4146777db')],
  racket: ['https://badmintonclick.com.au/cdn/shop/files/zz-3AX88D-P_076-1_1024x.jpg?v=1709630311'],
  dumbbell: [unsplash('photo-1586401100295-7a8096fd231a')],
  shoe: [unsplash('photo-1542291026-7eec264c27ff'), unsplash('photo-1549298916-b41d501d3772')],
  jersey: [unsplash('photo-1521572163474-6864f9cf17ab')],
};

// Match the main arrival cards to the named equipment rather than a different brand.
const productPhotos = {
  1: 'https://crickstore.com/cdn/shop/files/TR3.jpg?v=1743358744',
  3: 'https://kookaburrasport.co.in/cdn/shop/files/2A14190-GhostProPlayersCricketBat-14.jpg?v=1764159781',
  20: 'https://topcricketstore.com/cdn/shop/files/AdidasAdipowerVector20CricketShoesWhiteBlueRed1.png?v=1745713236',
  25: 'https://assets.adidas.com/images/w_1000,f_auto,q_auto/c386d4300392481ebf5c4a4ff45ea800_9366/Tiro26_League_Jersey_Black_KR9649_01_laydown.jpg',
};

export const productPhotoUrl = (keywords, id) => site.placeholderPhotos
  ? productPhotos[id] ?? photoUrl(keywords, id) : undefined;

/** @param {string} keywords comma separated @param {number} lock stable selection */
export const photoUrl = (keywords = '', lock = 0) => {
  if (!site.placeholderPhotos) return undefined;
  const words = keywords.split(',');
  const type = words.includes('stadium') || words.includes('batsman') ? 'cricket'
    : words.includes('bat') ? 'bat'
    : words.includes('helmet') ? 'helmet'
    : words.includes('ball') && words.includes('cricket') ? 'ball'
    : words.includes('pads') ? 'pads'
    : words.includes('gloves') ? 'gloves'
    : words.includes('cricket') ? 'cricket'
    : words.includes('soccer') || words.includes('football') ? 'football'
    : words.includes('badminton') ? 'racket'
    : words.includes('dumbbell') ? 'dumbbell'
    : words.includes('shoes') ? 'shoe' : 'jersey';
  const options = photos[type];
  return options[Math.abs(lock) % options.length];
};
