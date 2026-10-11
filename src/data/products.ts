export type Category = 'Toran' | 'Wall hanging' | 'Door hanging' | 'Bundle'

export type Review = {
  id: string
  name: string
  rating: number
  date: string
  title: string
  body: string
  verified?: boolean
}

export type Product = {
  id: string
  name: string
  category: Category
  price: number
  description: string
  image: string
  images: string[]
  features: string[]
  details: string
  reviews: Review[]
}

export const categories: Array<Category | 'All'> = [
  'All',
  'Toran',
  'Wall hanging',
  'Door hanging',
  'Bundle',
]

const img = (id: string, extras = '') =>
  `https://images.unsplash.com/${id}?w=1200&h=1200&fit=crop&q=80${extras}`

export const products: Product[] = [
  {
    id: 'toran-marigold',
    name: 'Marigold Bandhanwar Toran',
    category: 'Toran',
    price: 499,
    description:
      'Handcrafted marigold and pearl toran for your main door. Bright, festive, and easy to hang.',
    image: img('photo-1604608672516-f1b9b1c37076'),
    images: [
      img('photo-1604608672516-f1b9b1c37076'),
      img('photo-1605649487212-47bdab064df7'),
      img('photo-1635322966219-b75ed372eb01'),
    ],
    features: [
      'Handmade with marigold motifs & pearl beads',
      'Fits most apartment & villa doorways',
      'Lightweight — hangs with hooks or nails',
      'Packed for Bangalore doorstep delivery',
    ],
    details:
      'Length approx. 3–3.5 ft. Wipe gently with a dry cloth. Keep away from continuous moisture. Perfect for Diwali, housewarmings, and festive weekends.',
    reviews: [
      {
        id: 'r1',
        name: 'Ananya R.',
        rating: 5,
        date: 'Oct 2025',
        title: 'Looks stunning on our Indiranagar door',
        body: 'Bright and festive without being garish. Hung it in under a minute — guests noticed immediately.',
        verified: true,
      },
      {
        id: 'r2',
        name: 'Karthik M.',
        rating: 4,
        date: 'Sep 2025',
        title: 'Great quality for the price',
        body: 'Beads are neat and the colours are rich. Ordered a second one for the balcony door.',
        verified: true,
      },
    ],
  },
  {
    id: 'toran-mirror',
    name: 'Mirror Work Toran',
    category: 'Toran',
    price: 799,
    description:
      'Traditional mirror and beadwork toran that catches the light — a Bangalore favourite for Diwali.',
    image: img('photo-1605649487212-47bdab064df7'),
    images: [
      img('photo-1605649487212-47bdab064df7'),
      img('photo-1604608672516-f1b9b1c37076'),
      img('photo-1578662996442-48f60103fc96'),
    ],
    features: [
      'Mirror & bead detailing that sparkles in evening light',
      'Traditional festive look for main entrances',
      'Reinforced hanging loops',
      'Pairs beautifully with fairy lights',
    ],
    details:
      'Hand-finished mirror work. Approximate span 3 ft. Store flat when not in use. Ideal for Lakshmi Puja décor.',
    reviews: [
      {
        id: 'r3',
        name: 'Priya S.',
        rating: 5,
        date: 'Oct 2025',
        title: 'Exactly like the photos',
        body: 'The mirrors catch our porch lights so well. Feels premium and festive.',
        verified: true,
      },
    ],
  },
  {
    id: 'wall-diya',
    name: 'Diya Motif Wall Hanging',
    category: 'Wall hanging',
    price: 649,
    description:
      'Warm diya motifs on fabric — hang in the living room or entryway for instant festive glow.',
    image: img('photo-1578662996442-48f60103fc96'),
    images: [
      img('photo-1578662996442-48f60103fc96'),
      img('photo-1635322966219-b75ed372eb01'),
      img('photo-1605649487212-47bdab064df7'),
    ],
    features: [
      'Warm diya motif design for living rooms',
      'Ready-to-hang with wall hooks',
      'Soft fabric that won’t scratch paint',
      'Makes a lovely housewarming gift',
    ],
    details:
      'Approx. 18–22 inches wide. Spot clean only. Looks best against light walls or near brass accents.',
    reviews: [
      {
        id: 'r4',
        name: 'Meera K.',
        rating: 5,
        date: 'Oct 2025',
        title: 'Living room ready',
        body: 'Hung above our console with diyas below — whole corner feels festive.',
        verified: true,
      },
      {
        id: 'r5',
        name: 'Rohan D.',
        rating: 4,
        date: 'Sep 2025',
        title: 'Nice texture',
        body: 'Colours are softer in person, which we preferred. Good finish.',
      },
    ],
  },
  {
    id: 'wall-mandala',
    name: 'Golden Mandala Wall Piece',
    category: 'Wall hanging',
    price: 899,
    description:
      'Statement mandala wall hanging in gold tones. Pairs well with fairy lights and brass accents.',
    image: img('photo-1635322966219-b75ed372eb01'),
    images: [
      img('photo-1635322966219-b75ed372eb01'),
      img('photo-1578662996442-48f60103fc96'),
      img('photo-1604608672516-f1b9b1c37076'),
    ],
    features: [
      'Statement gold-tone mandala for feature walls',
      'Works with fairy lights & brass décor',
      'Sturdy backing for easy mounting',
      'Eye-catching for puja rooms & living spaces',
    ],
    details:
      'Diameter approx. 16–20 inches. Wipe with dry cloth. Avoid hanging in humid bathrooms.',
    reviews: [
      {
        id: 'r6',
        name: 'Sneha P.',
        rating: 5,
        date: 'Oct 2025',
        title: 'Statement piece',
        body: 'Looks rich next to our brass diyas. Packaging was careful too.',
        verified: true,
      },
    ],
  },
  {
    id: 'door-bell',
    name: 'Temple Bell Door Hanging',
    category: 'Door hanging',
    price: 549,
    description:
      'Soft-chime door hanging with bells and beads. Welcome guests the festive way.',
    image: img('photo-1518709268805-4e9042af9f23'),
    images: [
      img('photo-1518709268805-4e9042af9f23'),
      img('photo-1544551763-46a013bb70d5'),
      img('photo-1605649487212-47bdab064df7'),
    ],
    features: [
      'Soft temple-bell chime when the door moves',
      'Bead & bell mix for a traditional look',
      'Compact for flat doors',
      'Easy hook mount — no drilling needed',
    ],
    details:
      'Length approx. 12–16 inches. Bells are decorative with a soft tone. Keep out of reach of toddlers if needed.',
    reviews: [
      {
        id: 'r7',
        name: 'Divya N.',
        rating: 5,
        date: 'Oct 2025',
        title: 'Such a warm welcome',
        body: 'Soft chime every time someone enters — kids love it too.',
        verified: true,
      },
    ],
  },
  {
    id: 'door-lotus',
    name: 'Lotus Charm Door Hanging',
    category: 'Door hanging',
    price: 449,
    description:
      'Compact lotus and bead door hanging — ideal for apartments and flat doors.',
    image: img('photo-1544551763-46a013bb70d5'),
    images: [
      img('photo-1544551763-46a013bb70d5'),
      img('photo-1518709268805-4e9042af9f23'),
      img('photo-1604608672516-f1b9b1c37076'),
    ],
    features: [
      'Compact lotus charm for apartment doors',
      'Lightweight beads — won’t strain the handle',
      'Festive without overwhelming small entryways',
      'Budget-friendly accent piece',
    ],
    details:
      'Length approx. 10–14 inches. Spot clean. Great paired with a matching toran.',
    reviews: [
      {
        id: 'r8',
        name: 'Aditi V.',
        rating: 4,
        date: 'Sep 2025',
        title: 'Cute for our flat',
        body: 'Perfect size for our Whitefield apartment door. Wish there was a larger option too.',
        verified: true,
      },
    ],
  },
  {
    id: 'bundle-entry',
    name: 'Entryway Festive Bundle',
    category: 'Bundle',
    price: 1499,
    description:
      'Toran + door hanging + wall piece set for a complete main-door look. Best value for families.',
    image: img('photo-1604608672516-f1b9b1c37076', '&sat=-20'),
    images: [
      img('photo-1604608672516-f1b9b1c37076', '&sat=-20'),
      img('photo-1518709268805-4e9042af9f23'),
      img('photo-1635322966219-b75ed372eb01'),
    ],
    features: [
      'Complete entryway set: toran + door hanging + wall piece',
      'Coordinated festive palette',
      'Best value vs buying separately',
      'Ready for Diwali weekend styling',
    ],
    details:
      'Includes three pieces curated to match. See individual care notes for fabric and metal parts. Ideal gift for families setting up a new home.',
    reviews: [
      {
        id: 'r9',
        name: 'Neha & Arjun',
        rating: 5,
        date: 'Oct 2025',
        title: 'Whole entrance transformed',
        body: 'Bought the bundle for our new house in HSR. Everything matched and arrived together.',
        verified: true,
      },
      {
        id: 'r10',
        name: 'Vikram T.',
        rating: 5,
        date: 'Oct 2025',
        title: 'Worth it',
        body: 'Cheaper than buying pieces separately and looks intentional as a set.',
        verified: true,
      },
    ],
  },
  {
    id: 'bundle-living',
    name: 'Living Room Glow Bundle',
    category: 'Bundle',
    price: 1299,
    description:
      'Two wall hangings curated for living rooms — ready to style for Lakshmi Puja gatherings.',
    image: img('photo-1605649487212-47bdab064df7', '&sat=-10'),
    images: [
      img('photo-1605649487212-47bdab064df7', '&sat=-10'),
      img('photo-1578662996442-48f60103fc96'),
      img('photo-1635322966219-b75ed372eb01'),
    ],
    features: [
      'Two complementary wall hangings',
      'Styled for living rooms & puja corners',
      'Gift-ready packaging',
      'Balanced colours for modern Bangalore homes',
    ],
    details:
      'Two pieces. Mount with wall hooks. Soft lighting or fairy lights enhance the set.',
    reviews: [
      {
        id: 'r11',
        name: 'Lakshmi G.',
        rating: 5,
        date: 'Sep 2025',
        title: 'Perfect for puja guests',
        body: 'Our living room felt ready for Lakshmi Puja without overcrowding the walls.',
        verified: true,
      },
    ],
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function getSimilarProducts(product: Product, limit = 3) {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  )
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)
  const rest = products.filter(
    (p) => p.id !== product.id && !sameCategory.some((s) => s.id === p.id),
  )
  return [...sameCategory, ...rest].slice(0, limit)
}

export function averageRating(reviews: Review[]) {
  if (reviews.length === 0) return 0
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
}
