import type { Product } from './products.seed.ts'

/** Minimum order value (INR) for Chhath items in a cart. */
export const CHHATH_MIN_ORDER = 2000

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

/** Package tile banner for link previews (WhatsApp, etc.). */
export function chhathPackageOgImage(bannerPath: string): string {
  if (/-\d+\.webp$/i.test(bannerPath)) return bannerPath
  const base = bannerPath.replace(/\.[^.]+$/, '')
  return `${base}-800.webp`
}

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
 * an explicit price is given as the 6th tuple value. Replace before launch
 * (prices can also be overridden from the admin panel).
 */
const DEFAULT_PRICE: Record<ChhathGroup, number> = {
  'Puja Essentials': 150,
  Fruits: 200,
  'Prasad Ingredients': 150,
}

/** [sku | null, imageSlug, English, Hindi, unit, explicit price?] */
type Row = [number | null, string, string, string, string, number?]

const essentials: Row[] = [
  [2001, 'wooden-daura', 'Wooden Daura (Big Basket)', 'लकड़ी का दउरा', '1 pc, big'],
  [2002, 'soop', 'Wooden Soop', 'लकड़ी का सूप', '1 pair (2 pc)'],
  [2003, 'copper-lota', 'Copper Lota', 'तांबे का लोटा', '1 pc'],
  [2004, 'gamcha', 'Cotton Gamcha', 'सूती गमछा', '1 pc'],
  [2005, 'sindoor', 'Sindoor', 'सिंदूर', '1 packet'],
  [2006, 'thekua-mould', 'Thekua Mould', 'ठेकुआ का साँचा', '1 pc'],
  [2007, 'ghee', 'Pure Desi Ghee', 'शुद्ध देसी घी', '2.5 kg'],
  [2008, 'honey', 'Honey', 'शहद', '100 gm'],
  [2009, 'roli', 'Roli', 'रोली', '1 packet'],
  [2010, 'alta', 'Alta', 'आलता', '1 dabba'],
  [2011, 'dhoop', 'Dhoop', 'धूप', '1 packet'],
  [2012, 'agarbatti', 'Agarbatti', 'अगरबत्ती', '1 packet'],
  [2013, 'humad-mix', 'Humad Mix', 'हुमाद मिश्रण', '1 kg'],
  [2014, 'humad-raw', 'Raw Medium Size Humad', 'कच्चा हुमाद', '1 kg'],
  [2015, 'diyas', 'Earthen Diyas (medium)', 'मिट्टी के दीये', '25 pc'],
  [2016, 'cotton-wicks', 'Cotton Wicks', 'रूई की बत्ती', '1 packet'],
  [2017, 'camphor', 'Camphor', 'कपूर', '250 gm'],
  [2018, 'datun', 'Mango Twig for Datun', 'आम का दातून', '10 pc'],
  [2019, 'badhi', 'Badhi (Neck Ornament)', 'बधिया (गले की माला)', '20 pc'],
  [2020, 'alta-paper', 'Alta Paper', 'आलता पेपर', '10 pc'],
  [2021, 'surya-picture', 'Picture of Surya Bhagwan', 'सूर्य भगवान की तस्वीर', '1 pc'],
  [2022, 'gangajal', 'Gangajal', 'गंगाजल', '500 ml'],
  [2023, 'puja-flowers', 'Puja Flowers', 'पूजा के फूल', 'set'],
  [2024, 'agastya-flowers', 'Agastya Flowers', 'अगस्त के फूल', 'set'],
  [2025, 'kalash', 'Kalash (earthen)', 'मिट्टी का कलश', '1 pc'],
  [2026, 'akshat', 'Akshat (Whole Rice)', 'अक्षत (साबुत चावल)', '100 gm'],
  [2027, 'mauli', 'Mauli / Kalawa', 'मौली / कलावा', '1 pc'],
  [2028, 'janeu', 'Janeu', 'जनेऊ', '5 pc'],
  [2029, 'betel-leaves', 'Betel Leaves (with stem)', 'डंठी वाले पान के पत्ते', 'set'],
  [2030, 'betel-nuts', 'Betel Nuts', 'सुपारी', '50 gm'],
  [2031, 'cloves', 'Cloves', 'लौंग', '50 gm'],
  [2032, 'cardamom', 'Cardamom', 'इलायची', '50 gm'],
  [2033, 'panchmeva', 'Panchmeva', 'पंचमेवा', '250 gm'],
  [2034, 'batasha', 'Batasha', 'बताशा', '250 gm'],
  [2035, 'matchbox', 'Matchbox', 'माचिस', '1 packet'],
  [2036, 'puja-thali', 'Puja Thali', 'पूजा की थाली', '1 pc'],
  [2037, 'dhoti', 'Yellow Cotton Dhoti', 'पीली सूती धोती', '1 pc'],
  [2038, 'chulha', 'Earthen Stove', 'मिट्टी का चूल्हा', '1 pc'],
  [2039, 'mango-wood', 'Mango Wood', 'आम की लकड़ी', '2.5 kg'],
  [2040, 'upla', 'Cow Dung Cakes', 'गोबर के उपले', '10 pc'],
  [2041, 'jatadhari', 'Jatadhari Phool', 'जटाधारी फूल', '100 gm'],
  [2042, 'kerao', 'Keraw (Kusiya Matar)', 'केराव (कुसिया मटर)', '250 gm'],
]

const fruits: Row[] = [
  [2051, 'royal-gala', 'Royal Gala Apple', 'रॉयल गाला सेब', '1 kg'],
  [2052, 'pink-lady', 'Pink Lady Apple', 'पिंक लेडी सेब', '1 kg'],
  [2053, 'shimla-apple', 'Shimla Apple', 'शिमला सेब', '1 kg'],
  [2054, 'pomegranate', 'Pomegranate', 'अनार', '1 kg'],
  [2055, 'banana', 'Banana (Full Bunch)', 'केला (पूरा घौद)', '1 bunch'],
  [2056, 'pineapple', 'Pineapple', 'अनानास', '1 pc'],
  [2057, 'coconut-husk', 'Coconut with Husk', 'जटा वाला नारियल', '1 pc'],
  [2058, 'coconut-plain', 'Coconut without Husk', 'बिना जटा वाला नारियल', '1 pc'],
  [2059, 'sugarcane', 'Sugarcane', 'गन्ना', '1 stalk'],
  [2060, 'sharifa', 'Custard Apple / Sharifa', 'सीताफल / शरीफा', '1 kg'],
  [2061, 'gagra-nimbu', 'Gagra Nimbu', 'गगरा नींबू', '1 pc'],
  [2063, 'nagpur-orange', 'Nagpur Orange', 'नागपुर संतरा', '1 kg'],
  [2064, 'imported-orange', 'Imported Orange', 'इम्पोर्टेड संतरा', '1 kg'],
  [2065, 'pear', 'Pear', 'नाशपाती', '1 kg'],
  [2066, 'grapes', 'Grapes', 'अंगूर', '1 kg'],
  [2067, 'sweet-lime', 'Sweet Lime', 'मौसंबी', '1 kg'],
  [2068, 'guava', 'Guava', 'अमरूद', '1 kg'],
  [2069, 'water-chestnut', 'Water Chestnut', 'सिंघाड़ा', '1 kg'],
  [2070, 'daabh', 'Daabh', 'डाभ', '1 pc'],
  [2071, 'sweet-potato', 'Sweet Potato', 'शकरकंद', '1 kg'],
  [2072, 'radish', 'Radish with Leaves', 'पत्तों वाली मूली', '1 kg'],
  [2073, 'ginger-leaves', 'Ginger with Leaves', 'पत्तों वाली अदरक', '500 gm'],
  [2074, 'turmeric-leaves', 'Fresh Turmeric with Leaves', 'पत्तों वाली कच्ची हल्दी', '500 gm'],
  [2075, 'suthni', 'Suthni', 'सुथनी', '1 kg'],
  [2076, 'ber', 'Ber / Indian Jujube', 'बेर', '500 gm'],
  [2077, 'amla', 'Indian Gooseberry / Amla', 'आँवला', '500 gm'],
  [2078, 'blueberry', 'Blueberry (Optional)', 'ब्लूबेरी (वैकल्पिक)', 'pack'],
  [2079, 'avocado', 'Avocado (Optional)', 'एवोकाडो (वैकल्पिक)', '1 pc'],
  [2080, 'dragon-fruit', 'Dragon Fruit (Optional)', 'ड्रैगन फ्रूट (वैकल्पिक)', '1 pc'],
  [2081, 'kiwi', 'Kiwi (Optional)', 'कीवी (वैकल्पिक)', '1 pc'],
  [null, 'strawberry', 'Strawberry (Optional)', 'स्ट्रॉबेरी (वैकल्पिक)', 'pack'],
  [null, 'longan', 'Longan / Imported Lychee (Optional)', 'लॉन्गन / विदेशी लीची (वैकल्पिक)', 'pack'],
  [null, 'fruit-package', 'Complete Fruit Package (2.5 kg)', 'फल पैकेज (2.5 किलो)', 'package', 5000],
  [null, 'fruit-package', 'Complete Fruit Package (5 kg)', 'फल पैकेज (5 किलो)', 'package', 10000],
]

const prasad: Row[] = [
  [2085, 'wheat-flour', 'Wheat Flour', 'गेहूं का आटा', '1 kg'],
  [2087, 'rice-flour', 'Rice Flour', 'चावल का आटा', '1 kg'],
  [2088, 'jaggery', 'Jaggery', 'गुड़', '1 kg'],
  [2089, 'ghee', 'Pure Desi Ghee (Amul Cow Ghee)', 'शुद्ध देसी घी (अमूल)', '1 kg'],
  [2090, 'fennel', 'Fennel Seeds', 'सौंफ', '100 gm'],
  [2091, 'grated-coconut', 'Grated Coconut', 'कद्दूकस किया हुआ नारियल', '250 gm'],
  [2092, 'sugar', 'Sugar', 'चीनी', '1 kg'],
  [2093, 'chana-dal', 'Chana Dal', 'चना दाल', '500 gm'],
  [2094, 'cardamom', 'Cardamom', 'इलायची', '50 gm'],
  [2095, 'dry-dates', 'Dry Dates', 'छुआरा', '250 gm'],
]

/**
 * Products that share an image basename but need distinct slug ids when sku is null.
 * fruit-package rows use shared photo; ids stay chhath-fruit-pkg-*.
 */
const NULL_SKU_IDS: Record<string, string> = {
  'Complete Fruit Package (2.5 kg)': 'chhath-fruit-pkg-2-5',
  'Complete Fruit Package (5 kg)': 'chhath-fruit-pkg-5',
  'Strawberry (Optional)': 'chhath-strawberry',
  'Longan / Imported Lychee (Optional)': 'chhath-longan',
}

/**
 * Old slug-based product ids → new `chhath-<sku>` ids.
 * Used for Supabase migration SQL; keep in sync with rows above.
 */
export const CHHATH_ID_REMAP: Record<string, string> = {
  'chhath-daura': 'chhath-2001',
  'chhath-soop': 'chhath-2002',
  'chhath-lota': 'chhath-2003',
  'chhath-gamcha': 'chhath-2004',
  'chhath-sindoor': 'chhath-2005',
  'chhath-thekua-mould': 'chhath-2006',
  'chhath-ghee-puja': 'chhath-2007',
  'chhath-honey': 'chhath-2008',
  'chhath-roli': 'chhath-2009',
  'chhath-alta': 'chhath-2010',
  'chhath-dhoop': 'chhath-2011',
  'chhath-agarbatti': 'chhath-2012',
  'chhath-humad-mix': 'chhath-2013',
  'chhath-humad-raw': 'chhath-2014',
  'chhath-diyas': 'chhath-2015',
  'chhath-ghee-wicks': 'chhath-2016',
  'chhath-camphor': 'chhath-2017',
  'chhath-datun': 'chhath-2018',
  'chhath-badhi': 'chhath-2019',
  'chhath-alta-paper': 'chhath-2020',
  'chhath-surya-picture': 'chhath-2021',
  'chhath-gangajal': 'chhath-2022',
  'chhath-puja-flowers': 'chhath-2023',
  'chhath-agastya-flowers': 'chhath-2024',
  'chhath-kalash': 'chhath-2025',
  'chhath-akshat': 'chhath-2026',
  'chhath-mauli': 'chhath-2027',
  'chhath-janeu': 'chhath-2028',
  'chhath-betel-leaves': 'chhath-2029',
  'chhath-betel-nuts': 'chhath-2030',
  'chhath-cloves': 'chhath-2031',
  'chhath-cardamom-puja': 'chhath-2032',
  'chhath-panchmeva': 'chhath-2033',
  'chhath-batasha': 'chhath-2034',
  'chhath-matchbox': 'chhath-2035',
  'chhath-puja-thali': 'chhath-2036',
  'chhath-dhoti': 'chhath-2037',
  'chhath-chulha': 'chhath-2038',
  'chhath-mango-wood': 'chhath-2039',
  'chhath-upla': 'chhath-2040',
  'chhath-jatadhari': 'chhath-2041',
  'chhath-kerao': 'chhath-2042',
  'chhath-royal-gala': 'chhath-2051',
  'chhath-pink-lady': 'chhath-2052',
  'chhath-shimla-apple': 'chhath-2053',
  'chhath-pomegranate': 'chhath-2054',
  'chhath-banana': 'chhath-2055',
  'chhath-pineapple': 'chhath-2056',
  'chhath-coconut-husk': 'chhath-2057',
  'chhath-coconut-plain': 'chhath-2058',
  'chhath-sugarcane': 'chhath-2059',
  'chhath-sharifa': 'chhath-2060',
  'chhath-gagra-nimbu': 'chhath-2061',
  'chhath-nagpur-orange': 'chhath-2063',
  'chhath-imported-orange': 'chhath-2064',
  'chhath-pear': 'chhath-2065',
  'chhath-grapes': 'chhath-2066',
  'chhath-sweet-lime': 'chhath-2067',
  'chhath-guava': 'chhath-2068',
  'chhath-water-chestnut': 'chhath-2069',
  'chhath-daabh': 'chhath-2070',
  'chhath-sweet-potato': 'chhath-2071',
  'chhath-radish': 'chhath-2072',
  'chhath-ginger-leaves': 'chhath-2073',
  'chhath-turmeric-leaves': 'chhath-2074',
  'chhath-suthni': 'chhath-2075',
  'chhath-ber': 'chhath-2076',
  'chhath-amla': 'chhath-2077',
  'chhath-blueberry': 'chhath-2078',
  'chhath-avocado': 'chhath-2079',
  'chhath-dragon-fruit': 'chhath-2080',
  'chhath-kiwi': 'chhath-2081',
  'chhath-wheat-flour': 'chhath-2085',
  'chhath-rice-flour': 'chhath-2087',
  'chhath-jaggery': 'chhath-2088',
  'chhath-amul-ghee': 'chhath-2089',
  'chhath-fennel': 'chhath-2090',
  'chhath-grated-coconut': 'chhath-2091',
  'chhath-sugar': 'chhath-2092',
  'chhath-chana-dal': 'chhath-2093',
  'chhath-cardamom-prasad': 'chhath-2094',
  'chhath-dry-dates': 'chhath-2095',
}

/** Image basename that exists under public/chath/items/ (no extension). */
const PHOTO_BASES = new Set([
  'agarbatti',
  'agastya-flowers',
  'akshat',
  'alta',
  'alta-paper',
  'amla',
  'avocado',
  'badhi',
  'banana',
  'batasha',
  'ber',
  'betel-leaves',
  'betel-nuts',
  'blueberry',
  'camphor',
  'cardamom',
  'chana-dal',
  'chulha',
  'cloves',
  'coconut-husk',
  'coconut-plain',
  'copper-lota',
  'cotton-wicks',
  'daabh',
  'datun',
  'dhoop',
  'dhoti',
  'diyas',
  'dragon-fruit',
  'dry-dates',
  'fennel',
  'fruit-package',
  'gagra-nimbu',
  'gamcha',
  'gangajal',
  'ghee',
  'ginger-leaves',
  'grapes',
  'grated-coconut',
  'guava',
  'honey',
  'humad-mix',
  'humad-raw',
  'imported-orange',
  'jaggery',
  'janeu',
  'jatadhari',
  'kalash',
  'kerao',
  'kiwi',
  'longan',
  'mango-wood',
  'matchbox',
  'mauli',
  'nagpur-orange',
  'panchmeva',
  'pear',
  'pineapple',
  'pink-lady',
  'pomegranate',
  'puja-flowers',
  'puja-thali',
  'radish',
  'rice-flour',
  'roli',
  'royal-gala',
  'sharifa',
  'shimla-apple',
  'sindoor',
  'soop',
  'strawberry',
  'sugar',
  'sugarcane',
  'surya-picture',
  'suthni',
  'sweet-lime',
  'sweet-potato',
  'thekua-mould',
  'turmeric-leaves',
  'upla',
  'water-chestnut',
  'wheat-flour',
  'wooden-daura',
])

function build(group: ChhathGroup, rows: Row[]): Product[] {
  return rows.map(([sku, imageSlug, name, hindi, unit, price]) => {
    const id =
      sku != null ? `chhath-${sku}` : (NULL_SKU_IDS[name] ?? `chhath-${imageSlug}`)
    const hasPhoto = PHOTO_BASES.has(imageSlug)
    const photo = hasPhoto ? `/chath/items/${imageSlug}-400.webp` : ''
    return {
      id,
      sku: sku ?? undefined,
      name,
      category: 'Chhath' as const,
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
