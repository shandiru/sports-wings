// SAMPLE DATA: prices, stock and specs are examples only. Replace with the real catalogue.
import { productPhotoUrl } from '../lib/photos.js';

const KEYWORDS = { bat: 'cricket,bat', ball: 'cricket,ball', helmet: 'cricket,helmet', pads: 'cricket,pads', football: 'football,soccer', racket: 'badminton,racket', dumbbell: 'dumbbell,gym', shoe: 'sports,shoes', jersey: 'sportswear,jersey' };
const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const BAT = ['Short handle', 'Long handle'];
const UK = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];
const CLOTH = ['S', 'M', 'L', 'XL', 'XXL'];

const make = (n, name, brand, category, visual, price, salePrice, sizes, specs, description, badge) => ({
  id: `p${n}`, slug: slugify(name), name, brand, category, visual, price, salePrice, sizes, specs, description, badge, images: [productPhotoUrl(name.includes('Gloves') ? 'cricket,gloves' : KEYWORDS[visual], n)].filter(Boolean),
});

export const products = [
  make(1, 'Ton Reserve Edition', 'SS', 'cricket', 'bat', 89500, null, BAT, { Willow: 'English, Grade 1', Weight: '1,180 to 1,230 g', 'Pick-up': 'Mid', Handle: 'Oval, 9 grip cane', Grains: '8 to 10' }, 'Hand-selected willow with a full, even face. Knocked in by our team before it leaves the shop.', 'New'),
  make(2, 'Powerbow 6 Gen', 'Gray-Nicolls', 'cricket', 'bat', 74000, 67500, BAT, { Willow: 'English, Grade 1', Weight: '1,150 to 1,200 g', 'Pick-up': 'Low', Handle: 'Oval', Grains: '7 to 9' }, 'A bat for hitting through the line. Big edges, low pick-up.', 'Sale'),
  make(3, 'Ghost Pro', 'Kookaburra', 'cricket', 'bat', 62000, null, BAT, { Willow: 'English, Grade 2', Weight: '1,140 to 1,190 g', 'Pick-up': 'High', Handle: 'Round', Grains: '6 to 8' }, 'Light in the hands with a high pick-up. Quick bat speed for front-foot players.', 'New'),
  make(4, 'Diamond 606', 'Gunn & Moore', 'cricket', 'bat', 58500, null, BAT, { Willow: 'English, Grade 2', Weight: '1,160 to 1,220 g', 'Pick-up': 'Mid', Handle: 'Oval', Grains: '6 to 9' }, 'A balanced all-rounder with a good middle and a clean finish.', null),
  make(5, 'Players Kashmir Willow', 'SS', 'cricket', 'bat', 18500, 15900, ['Size 5', 'Size 6', 'Harrow', 'Short handle'], { Willow: 'Kashmir', Weight: '900 to 1,150 g', 'Pick-up': 'Mid', Handle: 'Oval' }, 'Tough, affordable and good for juniors, nets and tape-ball.', 'Sale'),
  make(6, 'Red Leather Ball', 'Kookaburra', 'cricket', 'ball', 4200, null, [], { Weight: '156 g', Cover: '4 piece leather', Use: 'Match and nets', Colour: 'Red' }, 'A four piece hand-stitched match ball with a proud seam.', null),
  make(7, 'Turf White Ball', 'Kookaburra', 'cricket', 'ball', 4600, null, [], { Weight: '156 g', Cover: '4 piece leather', Use: 'Limited overs', Colour: 'White' }, 'White leather ball for day-night and limited overs matches.', null),
  make(8, 'Pro Test Helmet', 'SS', 'cricket', 'helmet', 21500, null, ['S', 'M', 'L'], { Grille: 'Titanium', Shell: 'ABS', Fit: 'Adjustable', Standard: 'BS 7928' }, 'Titanium grille, replaceable padding and an adjustable back strap.', 'New'),
  make(9, 'Test Batting Pads', 'Gray-Nicolls', 'cricket', 'pads', 16800, null, ['Youth', 'Boys', 'Men'], { Hand: 'Right or left', Weight: '780 g pair', Facing: 'Lightweight PU', Straps: '3 buckle' }, 'Light, cool and quick between the wickets.', null),
  make(10, 'Batting Gloves', 'Gunn & Moore', 'cricket', 'pads', 9800, 8400, ['Youth', 'Boys', 'Men'], { Palm: 'Pittard leather', Hand: 'Right or left', Protection: 'Multi-section', Closure: 'Wrist strap' }, 'Soft leather palm with segmented finger protection.', 'Sale'),
  make(11, 'Tiro Match Ball', 'Adidas', 'football', 'football', 9800, null, ['Size 5'], { Size: '5', Build: 'Thermal bonded', Use: 'Match', Bladder: 'Butyl' }, 'Thermal bonded panels keep the shape and stay true in the wet.', null),
  make(12, 'Strike Football', 'Nike', 'football', 'football', 7200, 6400, ['Size 4', 'Size 5'], { Size: '4 or 5', Build: 'Machine stitched', Use: 'Training', Bladder: 'Butyl' }, 'A tough training ball with a clean flight.', 'Sale'),
  make(13, 'Orbita Football', 'Puma', 'football', 'football', 5900, null, ['Size 5'], { Size: '5', Build: 'Machine stitched', Use: 'Training and school', Bladder: 'Butyl' }, 'A dependable ball for school and club sessions.', null),
  make(14, 'Astrox 88 D Pro', 'Yonex', 'badminton', 'racket', 38500, null, ['3U G5', '4U G5'], { Balance: 'Head heavy', Flex: 'Stiff', Frame: 'High modulus graphite', Tension: 'Up to 30 lbs' }, 'A head-heavy racket for strong smashes at the back of the court.', 'New'),
  make(15, 'Nanoflare 700', 'Yonex', 'badminton', 'racket', 32000, 28900, ['4U G5'], { Balance: 'Head light', Flex: 'Medium', Frame: 'Graphite', Tension: 'Up to 28 lbs' }, 'Fast through the air. Good for quick drives and net play.', 'Sale'),
  make(16, 'Arcsaber 11 Play', 'Yonex', 'badminton', 'racket', 26500, null, ['3U G5', '4U G5'], { Balance: 'Even', Flex: 'Medium', Frame: 'Graphite', Tension: 'Up to 28 lbs' }, 'A controlled all-court racket for club players.', null),
  make(17, 'Adjustable Dumbbell Set', 'Adidas', 'fitness', 'dumbbell', 24500, null, [], { Range: '2 to 20 kg', Plates: 'Cast iron', Grip: 'Knurled steel', Pair: 'Set of two' }, 'Change the weight in under a minute. One set replaces a full rack.', 'New'),
  make(18, 'Hex Dumbbell Pair 10 kg', 'Nike', 'fitness', 'dumbbell', 14800, null, [], { Weight: '10 kg each', Finish: 'Rubber coated', Shape: 'Hex', Pair: 'Set of two' }, 'Rubber hex heads that will not roll off the bench.', null),
  make(19, 'Gym Dumbbell Pair 5 kg', 'Puma', 'fitness', 'dumbbell', 8600, 7400, [], { Weight: '5 kg each', Finish: 'Neoprene', Shape: 'Round', Pair: 'Set of two' }, 'A comfortable neoprene grip for home workouts.', 'Sale'),
  make(20, 'Adipower Cricket Spikes', 'Adidas', 'footwear', 'shoe', 28900, null, UK, { Spikes: 'Full, metal', Upper: 'Synthetic leather', Fit: 'Standard', Use: 'Batting and bowling' }, 'Full spikes with a cushioned heel for long spells.', 'New'),
  make(21, 'Pegasus 41', 'Nike', 'footwear', 'shoe', 32500, 29900, UK, { Use: 'Road running', Drop: '10 mm', Cushion: 'Responsive foam', Upper: 'Engineered mesh' }, 'An easy daily trainer for runs and gym days.', 'Sale'),
  make(22, 'Velocity Nitro', 'Puma', 'footwear', 'shoe', 27500, null, UK, { Use: 'Road running', Drop: '8 mm', Cushion: 'Nitro foam', Upper: 'Knit mesh' }, 'Springy and light for tempo runs.', null),
  make(23, 'Power Cushion Court Shoe', 'Yonex', 'footwear', 'shoe', 23800, null, UK, { Use: 'Badminton and squash', Sole: 'Non-marking gum', Cushion: 'Power Cushion', Upper: 'Synthetic' }, 'Grip on the court and a soft landing from the jump.', null),
  make(24, 'Club Whites Shirt', 'SS', 'apparel', 'jersey', 5800, null, CLOTH, { Fabric: 'Cotton poly', Fit: 'Regular', Colour: 'White', Care: 'Machine wash' }, 'Breathable whites for long days in the field.', null),
  make(25, 'Tiro Training Jersey', 'Adidas', 'apparel', 'jersey', 6900, null, CLOTH, { Fabric: 'Recycled polyester', Fit: 'Slim', Colour: 'Black and gold', Care: 'Machine wash' }, 'Moisture-wicking and light for training.', 'New'),
  make(26, 'Dri-FIT Tee', 'Nike', 'apparel', 'jersey', 5400, 4600, CLOTH, { Fabric: 'Dri-FIT polyester', Fit: 'Regular', Colour: 'Black', Care: 'Machine wash' }, 'A plain performance tee that dries fast.', 'Sale'),
];
