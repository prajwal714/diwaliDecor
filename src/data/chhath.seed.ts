import type { Product } from './products.seed'

/** Minimum order value (INR) for Chhath items in a cart. */
export const CHHATH_MIN_ORDER = 2500

export type ChhathGroup = 'Puja Essentials' | 'Fruits' | 'Prasad Ingredients'

export const chhathGroups: ChhathGroup[] = [
  'Puja Essentials',
  'Fruits',
  'Prasad Ingredients',
]

export type ChhathGroupInfo = {
  slug: string
  group: ChhathGroup
  title: string
  badge: string
  hindi: string
  /** Full path of the tile/category image in /public */
  image: string
  tagline: string
  highlights: string[]
  details: string
}

export const chhathHeroImages = [1, 2, 3, 4].map((n) => `/chath/banner/hero-${n}.png`)

export const chhathGroupInfo: ChhathGroupInfo[] = [
  {
    slug: 'puja',
    badge: 'PUJA KIT',
    group: 'Puja Essentials',
    title: 'Puja Essentials Package',
    hindi: 'पूजा सामग्री पैकेज',
    image: '/chath/banner/puja.jpg',
    tagline: 'Everything you need for a sacred celebration',
    highlights: [
      'Daura, soop, kalash, thali and every ritual essential in one place',
      'Pure desi ghee, gangajal, camphor, dhoop and puja flowers',
      'Pick exactly the quantity of each item you need',
      'Traditional items, carefully sourced',
    ],
    details:
      'A complete Chhath Puja samagri list: wooden daura and soop, copper lota, kalash, diyas, sindoor, roli, alta, mango wood, gobar upla and more. Choose the quantity of each item to build your own package.',
  },
  {
    slug: 'fruits',
    badge: 'FRESH OFFERINGS',
    group: 'Fruits',
    title: 'Fruit Packages',
    hindi: 'फल पैकेज',
    image: '/chath/banner/fruits.png',
    tagline: 'Fresh · Seasonal · Traditional',
    highlights: [
      'Apples, pomegranate, banana bunch, pineapple, sugarcane and more',
      'Traditional Chhath fruits: suthni, singhara, ber, amla, leafy ginger and turmeric',
      'Ready 2.5 kg and 5 kg complete packages, or pick individual fruits',
      'Optional imported fruits for a richer thali',
    ],
    details:
      'Fresh seasonal fruits and traditional Chhath produce. Order a complete 2.5 kg or 5 kg package, or select individual fruits in the quantity you want.',
  },
  {
    slug: 'prasad',
    badge: 'PRASAD INGREDIENTS',
    group: 'Prasad Ingredients',
    title: 'Prasad Making Package',
    hindi: 'प्रसाद बनाने का पैकेज',
    image: '/chath/banner/prasad.png',
    tagline: 'Pure ingredients for traditional prasad',
    highlights: [
      'Wheat and rice flour, jaggery, sugar, chana dal, dry dates',
      'Pure desi ghee (Amul cow ghee), cardamom, fennel, grated coconut',
      'Make thekua, kheer, roti and kasar at home',
      'Quality ingredients, quantity of your choice',
    ],
    details:
      'Make your own thekua, kheer, roti and kasar with quality ingredients. हमारी गुणवत्तापूर्ण सामग्री से घर पर ठेकुआ, खीर, रोटी और कसार बनाएँ।',
  },
]

/**
 * TODO: PLACEHOLDER PRICES. Every item uses its group's default price unless
 * an explicit price is given as the 5th tuple value. Replace before launch
 * (prices can also be overridden from the admin panel).
 */
const DEFAULT_PRICE: Record<ChhathGroup, number> = {
  'Puja Essentials': 150,
  Fruits: 200,
  'Prasad Ingredients': 150,
}

// [slug, English, Hindi, unit, explicit price?]
type Row = [string, string, string, string, number?]

const essentials: Row[] = [
  ['daura', 'Wooden Daura (Big Basket)', 'लकड़ी का दउरा', '1 pc, big'],
  ['soop', 'Wooden Soop', 'लकड़ी का सूप', '1 pair (2 pc)'],
  ['lota', 'Copper Lota', 'तांबे का लोटा', '1 pc'],
  ['gamcha', 'Cotton Gamcha', 'सूती गमछा', '1 pc'],
  ['sindoor', 'Sindoor', 'सिंदूर', '1 packet'],
  ['thekua-mould', 'Thekua Mould', 'ठेकुआ का साँचा', '1 pc'],
  ['ghee-puja', 'Pure Desi Ghee', 'शुद्ध देसी घी', '2.5 kg'],
  ['honey', 'Honey', 'शहद', '100 gm'],
  ['roli', 'Roli', 'रोली', '1 packet'],
  ['alta', 'Alta', 'आलता', '1 dabba'],
  ['dhoop', 'Dhoop', 'धूप', '1 packet'],
  ['agarbatti', 'Agarbatti', 'अगरबत्ती', '1 packet'],
  ['humad-mix', 'Humad Mix', 'हुमाद मिश्रण', '1 kg'],
  ['humad-raw', 'Raw Medium Size Humad', 'कच्चा हुमाद', '1 kg'],
  ['diyas', 'Earthen Diyas (medium)', 'मिट्टी के दीये', '25 pc'],
  ['ghee-wicks', 'Cotton Ghee Wicks', 'रूई घी की बत्ती', '1 packet'],
  ['camphor', 'Camphor', 'कपूर', '250 gm'],
  ['datun', 'Mango Twig for Datun', 'आम का दातून', '10 pc'],
  ['badhi', 'Badhi (Neck Ornament)', 'बधिया (गले की माला)', '20 pc'],
  ['alta-paper', 'Alta Paper', 'आलता पेपर', '10 pc'],
  ['surya-picture', 'Picture of Surya Bhagwan', 'सूर्य भगवान की तस्वीर', '1 pc'],
  ['gangajal', 'Gangajal', 'गंगाजल', '500 ml'],
  ['puja-flowers', 'Puja Flowers', 'पूजा के फूल', 'set'],
  ['agastya-flowers', 'Agastya Flowers', 'अगस्त के फूल', 'set'],
  ['kalash', 'Kalash (earthen)', 'मिट्टी का कलश', '1 pc'],
  ['akshat', 'Akshat (Whole Rice)', 'अक्षत (साबुत चावल)', '100 gm'],
  ['mauli', 'Mauli / Kalawa', 'मौली / कलावा', '1 pc'],
  ['janeu', 'Janeu', 'जनेऊ', '5 pc'],
  ['betel-leaves', 'Betel Leaves (with stem)', 'डंठी वाले पान के पत्ते', 'set'],
  ['betel-nuts', 'Betel Nuts', 'सुपारी', '50 gm'],
  ['cloves', 'Cloves', 'लौंग', '50 gm'],
  ['cardamom-puja', 'Cardamom', 'इलायची', '50 gm'],
  ['panchmeva', 'Panchmeva', 'पंचमेवा', '250 gm'],
  ['batasha', 'Batasha', 'बताशा', '250 gm'],
  ['matchbox', 'Matchbox', 'माचिस', '1 packet'],
  ['puja-thali', 'Puja Thali', 'पूजा की थाली', '1 pc'],
  ['dhoti', 'Yellow Cotton Dhoti', 'पीली सूती धोती', '1 pc'],
  ['chulha', 'Earthen Stove', 'मिट्टी का चूल्हा', '1 pc'],
  ['mango-wood', 'Mango Wood', 'आम की लकड़ी', '2.5 kg'],
  ['upla', 'Cow Dung Cakes', 'गोबर के उपले', '10 pc'],
  ['jatadhari', 'Jatadhari Phool', 'जटाधारी फूल', '100 gm'],
  ['kerao', 'Green Peas (Kerao)', 'केराव (मटर)', '250 gm'],
]

const fruits: Row[] = [
  ['royal-gala', 'Royal Gala Apple', 'रॉयल गाला सेब', '1 kg'],
  ['pink-lady', 'Pink Lady Apple', 'पिंक लेडी सेब', '1 kg'],
  ['shimla-apple', 'Shimla Apple', 'शिमला सेब', '1 kg'],
  ['pomegranate', 'Pomegranate', 'अनार', '1 kg'],
  ['banana', 'Banana (Full Bunch)', 'केला (पूरा घौद)', '1 bunch'],
  ['pineapple', 'Pineapple', 'अनानास', '1 pc'],
  ['coconut-husk', 'Coconut with Husk', 'जटा वाला नारियल', '1 pc'],
  ['coconut-plain', 'Coconut without Husk', 'बिना जटा वाला नारियल', '1 pc'],
  ['sugarcane', 'Sugarcane', 'गन्ना', '1 stalk'],
  ['sharifa', 'Custard Apple / Sharifa', 'सीताफल / शरीफा', '1 kg'],
  ['gagra-nimbu', 'Gagra Nimbu', 'गगरा नींबू', '1 pc'],
  ['nagpur-orange', 'Nagpur Orange', 'नागपुर संतरा', '1 kg'],
  ['imported-orange', 'Imported Orange', 'इम्पोर्टेड संतरा', '1 kg'],
  ['pear', 'Pear', 'नाशपाती', '1 kg'],
  ['grapes', 'Grapes', 'अंगूर', '1 kg'],
  ['sweet-lime', 'Sweet Lime', 'मौसंबी', '1 kg'],
  ['guava', 'Guava', 'अमरूद', '1 kg'],
  ['water-chestnut', 'Water Chestnut', 'सिंघाड़ा', '1 kg'],
  ['daabh', 'Daabh', 'डाभ', '1 pc'],
  ['sweet-potato', 'Sweet Potato', 'शकरकंद', '1 kg'],
  ['radish', 'Radish with Leaves', 'पत्तों वाली मूली', '1 kg'],
  ['ginger-leaves', 'Ginger with Leaves', 'पत्तों वाली अदरक', '500 gm'],
  ['turmeric-leaves', 'Fresh Turmeric with Leaves', 'पत्तों वाली कच्ची हल्दी', '500 gm'],
  ['suthni', 'Suthni', 'सुथनी', '1 kg'],
  ['ber', 'Ber / Indian Jujube', 'बेर', '500 gm'],
  ['amla', 'Indian Gooseberry / Amla', 'आँवला', '500 gm'],
  ['blueberry', 'Blueberry (Optional)', 'ब्लूबेरी (वैकल्पिक)', 'pack'],
  ['avocado', 'Avocado (Optional)', 'एवोकाडो (वैकल्पिक)', '1 pc'],
  ['dragon-fruit', 'Dragon Fruit (Optional)', 'ड्रैगन फ्रूट (वैकल्पिक)', '1 pc'],
  ['kiwi', 'Kiwi (Optional)', 'कीवी (वैकल्पिक)', '1 pc'],
  ['strawberry', 'Strawberry (Optional)', 'स्ट्रॉबेरी (वैकल्पिक)', 'pack'],
  ['longan', 'Longan / Imported Lychee (Optional)', 'लॉन्गन / विदेशी लीची (वैकल्पिक)', 'pack'],
  ['fruit-pkg-2-5', 'Complete Fruit Package (2.5 kg)', 'फल पैकेज (2.5 किलो)', 'package', 5000],
  ['fruit-pkg-5', 'Complete Fruit Package (5 kg)', 'फल पैकेज (5 किलो)', 'package', 10000],
]

const prasad: Row[] = [
  ['wheat-flour', 'Wheat Flour', 'गेहूं का आटा', '1 kg'],
  ['rice-flour', 'Rice Flour', 'चावल का आटा', '1 kg'],
  ['jaggery', 'Jaggery', 'गुड़', '1 kg'],
  ['amul-ghee', 'Pure Desi Ghee (Amul Cow Ghee)', 'शुद्ध देसी घी (अमूल)', '1 kg'],
  ['fennel', 'Fennel Seeds', 'सौंफ', '100 gm'],
  ['grated-coconut', 'Grated Coconut', 'कद्दूकस किया हुआ नारियल', '250 gm'],
  ['sugar', 'Sugar', 'चीनी', '1 kg'],
  ['chana-dal', 'Chana Dal', 'चना दाल', '500 gm'],
  ['cardamom-prasad', 'Cardamom', 'इलायची', '50 gm'],
  ['dry-dates', 'Dry Dates', 'छुआरा', '250 gm'],
]

/**
 * Item photos in public/chath/items/. Map product id -> file base name
 * (without extension). `npm run images` creates <base>-400.webp / -800.webp.
 */
const itemImages: Record<string, string> = {
  'chhath-agarbatti': 'agarbatti',
  'chhath-akshat': 'akshat',
  'chhath-amla': 'amla',
  'chhath-amul-ghee': 'ghee',
  'chhath-avocado': 'avocado',
  'chhath-banana': 'banana',
  'chhath-batasha': 'batasha',
  'chhath-ber': 'ber',
  'chhath-betel-leaves': 'betel-leaves',
  'chhath-betel-nuts': 'betel-nuts',
  'chhath-blueberry': 'blueberry',
  'chhath-camphor': 'camphor',
  'chhath-cardamom-prasad': 'cardamom',
  'chhath-cardamom-puja': 'cardamom',
  'chhath-chana-dal': 'chana-dal',
  'chhath-cloves': 'cloves',
  'chhath-coconut-husk': 'coconut-husk',
  'chhath-coconut-plain': 'coconut-plain',
  'chhath-daabh': 'daabh',
  'chhath-datun': 'datun',
  'chhath-daura': 'wooden-daura',
  'chhath-dhoop': 'dhoop',
  'chhath-dhoti': 'dhoti',
  'chhath-diyas': 'diyas',
  'chhath-dragon-fruit': 'dragon-fruit',
  'chhath-dry-dates': 'dry-dates',
  'chhath-fennel': 'fennel',
  'chhath-fruit-pkg-2-5': 'fruit-package',
  'chhath-fruit-pkg-5': 'fruit-package',
  'chhath-gamcha': 'gamcha',
  'chhath-gangajal': 'gangajal',
  'chhath-ghee-puja': 'ghee',
  'chhath-ghee-wicks': 'ghee-wicks',
  'chhath-ginger-leaves': 'ginger-leaves',
  'chhath-grapes': 'grapes',
  'chhath-grated-coconut': 'grated-coconut',
  'chhath-guava': 'guava',
  'chhath-honey': 'honey',
  'chhath-imported-orange': 'imported-orange',
  'chhath-jaggery': 'jaggery',
  'chhath-kalash': 'kalash',
  'chhath-kiwi': 'kiwi',
  'chhath-longan': 'longan',
  'chhath-lota': 'copper-lota',
  'chhath-mango-wood': 'mango-wood',
  'chhath-matchbox': 'matchbox',
  'chhath-mauli': 'mauli',
  'chhath-nagpur-orange': 'nagpur-orange',
  'chhath-panchmeva': 'panchmeva',
  'chhath-pear': 'pear',
  'chhath-pineapple': 'pineapple',
  'chhath-pink-lady': 'pink-lady',
  'chhath-pomegranate': 'pomegranate',
  'chhath-puja-flowers': 'puja-flowers',
  'chhath-puja-thali': 'puja-thali',
  'chhath-radish': 'radish',
  'chhath-rice-flour': 'rice-flour',
  'chhath-royal-gala': 'royal-gala',
  'chhath-sharifa': 'sharifa',
  'chhath-shimla-apple': 'shimla-apple',
  'chhath-sindoor': 'sindoor',
  'chhath-soop': 'soop',
  'chhath-strawberry': 'strawberry',
  'chhath-sugar': 'sugar',
  'chhath-sugarcane': 'sugarcane',
  'chhath-surya-picture': 'surya-picture',
  'chhath-sweet-lime': 'sweet-lime',
  'chhath-sweet-potato': 'sweet-potato',
  'chhath-turmeric-leaves': 'turmeric-leaves',
  'chhath-water-chestnut': 'water-chestnut',
  'chhath-wheat-flour': 'wheat-flour',
}

function build(group: ChhathGroup, rows: Row[]): Product[] {
  return rows.map(([slug, name, hindi, unit, price]) => {
    const id = `chhath-${slug}`
    const img = itemImages[id]
    const photo = img ? `/chath/items/${img}-400.webp` : ''
    return {
    id,
    name,
    category: 'Chhath',
    group,
    hindiName: hindi,
    unit,
    price: price ?? DEFAULT_PRICE[group],
    description: `${name} — ${hindi} (${unit})`,
    image: photo || '/favicon.png',
    images: photo ? [photo] : [],
    features: [],
    details: '',
    reviews: [],
    }
  })
}

export const chhathProducts: Product[] = [
  ...build('Puja Essentials', essentials),
  ...build('Fruits', fruits),
  ...build('Prasad Ingredients', prasad),
]
