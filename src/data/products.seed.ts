export type Category = 'Toran'

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
  /** Standard (list) price, shown struck through when higher than price */
  mrp?: number
  description: string
  /** Main image (first of `images`) */
  image: string
  /** All images from public/products/<imageKey>/ (see vite.config.ts) */
  images: string[]
  features: string[]
  details: string
  badge?: string
  reviews: Review[]
}


type ProductSeed = Omit<Product, 'image' | 'images'> & { imageKey: string }

export const seeds: ProductSeed[] = [
  {
    id: 'toran-10001',
    imageKey: '10001',
    name: "Madhuvan – Handcrafted Radha-Krishna Floral Toran",
    category: 'Toran',
    price: 2500,
    mrp: 3000,
    description:
      "Bring home the divine essence of Vrindavan this festive season. The Madhuvan Toran features handcrafted artwork depicting Radha-Krishna on a jhula, flanked by protective evil-eye motifs with cowrie shells, lush florals, and vibrant parrots. An ideal centerpiece for your main doorway to welcome positivity, grace, and festive warmth.",
    features: [
      "Centerpiece Motif: Intricately detailed Radha-Krishna artwork on a swing.",
      "Auspicious Elements: Handcrafted Evil Eye discs framed with traditional Kaudi (cowrie) shells for protection and auspiciousness.",
      "Floral Splendor: Premium artificial marigolds, roses, dahlia accents, and lush green parrots on an embroidered lace base.",
      "Reusable & Long-Lasting: Premium materials that retain their vibrant colors year after year.",
      "Easy Installation: Lightweight construction with secure side loops for effortless hanging.",
    ],
    details:
      "Standard length 40 inches (fits most main entrance doors). Custom length available at ₹60 per inch — message us on WhatsApp. 100% handcrafted. Care: Gently dust with a soft dry cloth or soft brush after use. Store flat in a dry box to preserve shape and vibrant colors for future festivities. Perfect for Diwali main door entrances, mandir backdrops, pooja room doorways and festive photo walls. Comes securely packed in protective festive packaging, a lovely housewarming gift.",
    reviews: [],
  },
  {
    id: 'toran-10002',
    imageKey: '10002',
    name: "Nathdwara – Handcrafted Shreenathji Royal Floral Toran",
    category: 'Toran',
    price: 1800,
    mrp: 2200,
    description:
      "Experience divine elegance with a modern aesthetic. The Nathdwara Toran features an embroidered centerpiece of Lord Shreenathji set against a rich dark backdrop, framed by muted slate-grey dahlias, ivory roses, evil-eye motifs, and vibrant yellow hanging jhumkas.",
    features: [
      "Divine Centerpiece: Detailed facial motif of Lord Shreenathji framed in a layered rosette border.",
      "Contemporary Color Palette: Unique fusion of royal navy blue, charcoal grey, ivory white, and gold lacework.",
      "Protection & Auspiciousness: Hand-beaded Evil Eye circular discs to ward off negative vibes.",
      "Charming Latkans: Finished with bright yellow silk-thread hanging jhumkas with beaded tassels for a touch of classic Indian warmth.",
    ],
    details:
      "Standard length 40 inches (fits most main entrance doors). Custom length available at ₹50 per inch — message us on WhatsApp. 100% handcrafted. Care: Gently dust with a soft dry cloth or soft brush after use. Store flat in a dry box to preserve shape and vibrant colors for future festivities. Perfect for Diwali main door entrances, mandir backdrops, pooja room doorways and festive photo walls. Comes securely packed in protective festive packaging, a lovely housewarming gift.",
    reviews: [],
  },
  {
    id: 'toran-10003',
    imageKey: '10003',
    name: "Mayura – Handcrafted Royal Peacock Floral Toran",
    category: 'Toran',
    price: 2500,
    mrp: 3000,
    description:
      "Welcome regal charm into your home with the Mayura Toran. Featuring a velvet peacock motif crowned with natural feather plumage, this statement piece is adorned with a lush floral bouquet of sky blue, magenta, and sage green blooms. Complete with hand-beaded evil-eye accents and intricate gold mirror-work lace.",
    features: [
      "Regal Peacock Centerpiece: A 3D velvet blue peacock surrounded by a fan of natural peacock feathers embellished with stone & pearl detailing.",
      "Vibrant Garden Palette: A rich harmony of sky blue dahlias, magenta peonies, navy roses, and deep forest green foliage.",
      "Ward Off Negativity: Includes evil-eye discs bordered with natural cowrie (kaudi) shells for protection and traditional grace.",
      "Ornate Lace Base: Built on a heavy gold cutwork lace border lined with pearl droplets and mirror work.",
      "Durable & Reusable: Premium faux florals and sturdy craftsmanship ensure long-lasting beauty for seasons to come.",
    ],
    details:
      "Standard length 40 inches (fits most main entrance doors). Custom length available at ₹60 per inch — message us on WhatsApp. 100% handcrafted. Care: Gently dust with a soft dry cloth or soft brush after use. Store flat in a dry box to preserve shape and vibrant colors for future festivities. Perfect for Diwali main door entrances, mandir backdrops, pooja room doorways and festive photo walls. Comes securely packed in protective festive packaging, a lovely housewarming gift.",
    reviews: [],
  },
  {
    id: 'toran-10004',
    imageKey: '10004',
    name: "Shubh Labh Shreenath – Handcrafted Traditional Festive Toran",
    category: 'Toran',
    price: 1400,
    mrp: 1800,
    description:
      "Invite divine blessings, prosperity, and joy into your home with the Shubh Labh Shreenath Toran. Handcrafted with a stunning Shreenathji motif at its heart, this piece features traditional Shubh-Labh medallions, golden lotuses, colorful peacocks, and warm marigold blooms. Set on an ornate gold cutwork lace border.",
    features: [
      "Divine Centerpiece: Hand-embroidered Shreenathji face artwork framed in an intricate lotus base with mirror & pearl embellishments.",
      "Auspicious Motifs: Features circular beaded Shubh (Auspiciousness) and Labh (Prosperity) medallions.",
      "Golden Lotus & Peacock Accents: Flanked by sparkling golden lotus flowers and hand-crafted artistic peacocks.",
      "Festive Color Accent: Anchored at both ends with bright marigold-orange dahlias on a heavy golden lace background.",
      "Traditional & Sleek: Sits flat and clean against your door frame for an elegant, non-bulky traditional look.",
    ],
    details:
      "Standard length 40 inches (fits most main entrance doors). Custom length available at ₹40 per inch — message us on WhatsApp. 100% handcrafted. Care: Gently dust with a soft dry cloth or soft brush after use. Store flat in a dry box to preserve shape and vibrant colors for future festivities. Perfect for Diwali main door entrances, mandir backdrops, pooja room doorways and festive photo walls. Comes securely packed in protective festive packaging, a lovely housewarming gift.",
    reviews: [],
  },
  {
    id: 'toran-10005',
    imageKey: '10005',
    name: "Gajraj – Handcrafted Royal Elephant & Pleated Tissue Toran",
    category: 'Toran',
    price: 1400,
    mrp: 1800,
    description:
      "Bring home majestic royal heritage with the Gajraj Toran. Handcrafted with a procession of beaded elephant motifs (Gaja) interspersed with crisp white dahlia medallions, warm mustard accents, and delicate pearl hangings. Anchored by a flowing, pleated golden tissue veil.",
    features: [
      "Royal Elephant Motifs: Intricately hand-beaded ivory & brown elephant figures symbolizing strength, wisdom, and good fortune.",
      "Flowing Pleated Drape: Ethereal sheer-gold tissue drape with pearl-trimmed scalloped edges that frames the doorway gracefully.",
      "Intricate Medallions: Woven circular discs topped with pristine white dahlia blooms and golden leaf sprigs.",
      "Pearl & Lace Craftsmanship: Built on a heavy gold cutwork lace border lined with delicate pearl clusters and mirror accents.",
      "Statement Heritage Look: Blends traditional Gaja motifs with modern luxe textile design.",
    ],
    details:
      "Standard length 40 inches (fits most main entrance doors). Custom length available at ₹40 per inch — message us on WhatsApp. 100% handcrafted. Care: Gently dust with a soft dry cloth or soft brush after use. Store flat in a dry box to preserve shape and vibrant colors for future festivities. Perfect for Diwali main door entrances, mandir backdrops, pooja room doorways and festive photo walls. Comes securely packed in protective festive packaging, a lovely housewarming gift.",
    reviews: [],
  },
  {
    id: 'toran-10006',
    imageKey: '10006',
    name: "Raghukul – Handcrafted Crimson Velvet Embroidered Toran",
    category: 'Toran',
    price: 400,
    mrp: 600,
    description:
      "Experience classic royal heritage with the Raghukul Toran. Crafted on a luxurious crimson-red velvet band, this piece showcases intricate gold thread and sequin embroidery depicting traditional bird and floral vine motifs. Complete with a shimmering mirror-work top trim and a rich golden tassel fringe.",
    features: [
      "Rich Velvet Base: Crafted on soft, high-quality crimson red velvet for a deeply festive and regal finish.",
      "Intricate Heritage Embroidery: Detailed gold zari thread embroidery featuring paired birds, vines, and glittering sequin highlights.",
      "Cascading Golden Fringe: Trimmed along the lower edge with a fine metallic gold tassel border (Jhalar) that sways gracefully with motion.",
      "Triangle Mirror Trim: Lined with a sparkling geometric mirror-work top border to catch and reflect festive lights.",
      "Sleek & Durable: Compact, lightweight design with sturdy end rings for easy hanging without sagging.",
    ],
    details:
      "Standard length 40 inches (fits most main entrance doors). Custom length available at ₹12 per inch — message us on WhatsApp. 100% handcrafted. Care: Gently dust with a soft dry cloth or soft brush after use. Store flat in a dry box to preserve shape and vibrant colors for future festivities. Perfect for Diwali main door entrances, mandir backdrops, pooja room doorways and festive photo walls. Comes securely packed in protective festive packaging, a lovely housewarming gift.",
    reviews: [],
  },
  {
    id: 'toran-10007',
    imageKey: '10007',
    name: "Subh Laxmi – Handcrafted Divine Floral Festive Toran",
    category: 'Toran',
    price: 1600,
    mrp: 2000,
    description:
      "Invite wealth, harmony, and divine grace into your home with the Subh Laxmi Toran. Crafted around a central motif of Goddess Lakshmi seated on a lotus, this design is adorned with delicate pink roses, tropical greenery, peacock accents, and pearl-encrusted Shubh-Labh lotus medallions. Built on a vibrant mirror-studded lace border, it is the ultimate masterpiece for Diwali and Laxmi Puja.",
    features: [
      "Divine Centerpiece: Features Goddess Lakshmi seated in grace on a lotus blossom framed by ornate backing.",
      "Auspicious End Medallions: Vibrant hot-pink lotus-petal medallions housing pearl-beaded Shubh and Labh calligraphic centers.",
      "Floral & Peacock Artistry: A harmonious blend of soft pink tea roses, crisp white blooms, palm leaf sprays, and miniature peacock accents.",
      "Pearl & Diamond Lattice Details: Diamond-framed rose nests encrusted with pearl borders and subtle mirror highlights.",
      "Exquisite Scalloped Base: Trimmed with a detailed gold cutwork lace featuring multi-colored stone and mirror droplets.",
    ],
    details:
      "Standard length 40 inches (fits most main entrance doors). Custom length available at ₹40 per inch — message us on WhatsApp. 100% handcrafted. Care: Gently dust with a soft dry cloth or soft brush after use. Store flat in a dry box to preserve shape and vibrant colors for future festivities. Perfect for Diwali main door entrances, mandir backdrops, pooja room doorways and festive photo walls. Comes securely packed in protective festive packaging, a lovely housewarming gift.",
    reviews: [],
  },
  {
    id: 'toran-10008',
    imageKey: '10008',
    name: "Vighnaharta – Handcrafted Ganesha & Kamadhenu Festive Toran",
    category: 'Toran',
    price: 1400,
    mrp: 1800,
    badge: 'Customer Favorite · Best Value',
    description:
      "Welcome prosperity, peace, and good fortune into your home with our bestselling Vighnaharta Toran. Crafted around a central seated Lord Ganesha motif, this piece features hand-beaded Shubh-Labh medallions framed with natural cowrie shells, sacred Kamadhenu cows, vibrant festive marigolds, and a cascading pearl-bead mesh border. The ultimate traditional charm for your main entrance!",
    features: [
      "Divine Centerpiece: Hand-embroidered Lord Ganesha seated in a pearl-encrusted golden sunburst ring.",
      "Sacred Motifs: Features detailed beaded Kamadhenu (sacred cow) artwork symbolizing peace, purity, and wish-fulfillment.",
      "Shubh & Labh Blessings: Circular red-and-gold Shubh & Labh medallions bordered with natural cowrie (kaudi) shells.",
      "Cascading Pearl Mesh: Finished along the lower edge with a delicate, continuous woven pearl-bead mesh lattice drop.",
      "Rich Festive Colors: Crimson red, golden yellow marigold dahlias, and zardozi lotus accents.",
    ],
    details:
      "Standard length 40 inches (fits most main entrance doors). Custom length available at ₹40 per inch — message us on WhatsApp. 100% handcrafted. Care: Gently dust with a soft dry cloth or soft brush after use. Store flat in a dry box to preserve shape and vibrant colors for future festivities. Perfect for Diwali main door entrances, mandir backdrops, pooja room doorways and festive photo walls. Comes securely packed in protective festive packaging, a lovely housewarming gift.",
    reviews: [],
  },
  {
    id: 'toran-10009',
    imageKey: '10009',
    name: "Neelam – Handcrafted Pearl & Royal Blue Pleated Luxury Toran",
    category: 'Toran',
    price: 1400,
    mrp: 1800,
    description:
      "Redefine festive luxury with the Neelam Toran. Designed in a captivating palette of pristine white, silver sequins, and rich royal blue velvet, this masterpiece features three-dimensional embroidered fan medallions, crisp dahlia blooms, hanging pearl tassels, and a soft pleated sheer tissue drape. A sophisticated statement piece for modern luxury homes!",
    features: [
      "Ethereal Sheer Drape: Finished with a pleated white-silver tissue veil that creates a graceful archway drop over your entrance.",
      "Royal Blue Velvet Accents: Striking royal blue velvet petals embedded within silver sequin fan-blooms.",
      "Pristine Floral Artistry: 3D white dahlia and chrysanthemum blooms layered over pearl-encrusted star motifs.",
      "Hanging Pearl Latkans: Lined with weighted pearl-bead tassels (latkans) that dangle gracefully across the band.",
      "Intricate Lace Base: Crafted on a heavy gold-and-silver cutwork lace border topped with a royal blue lace scalloped crown.",
    ],
    details:
      "Standard length 40 inches (fits most main entrance doors). Custom length available at ₹50 per inch — message us on WhatsApp. 100% handcrafted. Care: Gently dust with a soft dry cloth or soft brush after use. Store flat in a dry box to preserve shape and vibrant colors for future festivities. Perfect for Diwali main door entrances, mandir backdrops, pooja room doorways and festive photo walls. Comes securely packed in protective festive packaging, a lovely housewarming gift.",
    reviews: [],
  },
]
