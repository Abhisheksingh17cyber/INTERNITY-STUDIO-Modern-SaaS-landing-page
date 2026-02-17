export const SITE_CONFIG = {
  name: 'INTERNITY WATCHES',
  tagline: 'Crafted for Eternity',
  description: 'Discover the finest luxury timepieces crafted with precision and elegance. INTERNITY WATCHES — where time meets art.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Shop', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Products', href: '/admin/products', icon: 'Package' },
  { label: 'Orders', href: '/admin/orders', icon: 'ShoppingBag' },
  { label: 'Customers', href: '/admin/customers', icon: 'Users' },
  { label: 'Analytics', href: '/admin/analytics', icon: 'BarChart3' },
];

export const WATCH_CATEGORIES = [
  { name: 'Dive', slug: 'dive', description: 'Engineered for the depths' },
  { name: 'Dress', slug: 'dress', description: 'Refined elegance for every occasion' },
  { name: 'Chronograph', slug: 'chronograph', description: 'Precision timing mastery' },
  { name: 'Skeleton', slug: 'skeleton', description: 'The art of mechanical beauty' },
  { name: 'Limited Edition', slug: 'limited-edition', description: 'Exclusive timepieces' },
];

export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: '#E8C84A' },
  { value: 'processing', label: 'Processing', color: '#3B82F6' },
  { value: 'shipped', label: 'Shipped', color: '#8B5CF6' },
  { value: 'delivered', label: 'Delivered', color: '#22C55E' },
  { value: 'cancelled', label: 'Cancelled', color: '#EF4444' },
] as const;

export const ANIMATION = {
  duration: {
    fast: 0.3,
    normal: 0.8,
    slow: 1.2,
    cinematic: 1.8,
  },
  ease: {
    luxury: 'power4.out',
    smooth: 'power2.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
  },
  stagger: {
    tight: 0.08,
    normal: 0.12,
    loose: 0.2,
  },
  scrollTrigger: {
    start: 'top 85%',
    startEarly: 'top 95%',
    startLate: 'top 70%',
  },
};

export const MOCK_TESTIMONIALS = [
  {
    id: '1',
    name: 'Alexander Rothschild',
    role: 'Art Collector',
    content: 'The craftsmanship is unparalleled. My Internity timepiece has become the centerpiece of my collection.',
    avatar: '/avatars/avatar-1.jpg',
  },
  {
    id: '2',
    name: 'Victoria Chen',
    role: 'CEO, Meridian Capital',
    content: 'Every detail speaks of dedication to perfection. This is not just a watch — it is a statement of legacy.',
    avatar: '/avatars/avatar-2.jpg',
  },
  {
    id: '3',
    name: 'James Harrington',
    role: 'Watch Enthusiast',
    content: 'In thirty years of collecting, few pieces have moved me like an Internity. The movement is poetry in motion.',
    avatar: '/avatars/avatar-3.jpg',
  },
];

export const FEATURES = [
  {
    icon: 'Watch',
    title: 'Swiss Movement',
    description: 'Every timepiece houses a meticulously crafted Swiss automatic movement with 72-hour power reserve.',
  },
  {
    icon: 'Shield',
    title: 'Lifetime Warranty',
    description: 'Backed by our unwavering commitment to quality with comprehensive lifetime coverage.',
  },
  {
    icon: 'Gem',
    title: 'Premium Materials',
    description: 'Crafted from 904L stainless steel, sapphire crystal, and genuine leather from the finest tanneries.',
  },
  {
    icon: 'Clock',
    title: 'Precision Certified',
    description: 'Each movement is COSC-certified, ensuring chronometric precision of -4/+6 seconds per day.',
  },
  {
    icon: 'Award',
    title: 'Heritage & Legacy',
    description: 'Continuing a tradition of horological excellence spanning generations of master craftsmen.',
  },
  {
    icon: 'Sparkles',
    title: 'Artisan Finishing',
    description: 'Hand-polished indices, côtes de Genève, and perlage finishing on every visible surface.',
  },
];

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Sovereign Chronograph',
    slug: 'sovereign-chronograph',
    price: 12500,
    category: 'chronograph',
    description: 'The Sovereign Chronograph embodies the pinnacle of mechanical precision. Featuring a 42mm case in 904L steel with a sunburst blue dial and three sub-dials measuring hours, minutes, and continuous seconds.',
    images: ['/watches/watch-1.png', '/watches/watch-2.png', '/watches/watch-3.png'],
    specs: { case: '42mm 904L Steel', movement: 'Automatic Chronograph', water_resistance: '100m', power_reserve: '72 hours', crystal: 'Sapphire' },
    stock: 15,
    featured: true,
  },
  {
    id: '2',
    name: 'Eternal Diver',
    slug: 'eternal-diver',
    price: 8900,
    category: 'dive',
    description: 'Built to withstand the abyss. The Eternal Diver features a unidirectional ceramic bezel, luminous indices, and 300m water resistance. A companion for the depths.',
    images: ['/watches/watch-4.png', '/watches/watch-5.png'],
    specs: { case: '44mm Titanium', movement: 'Automatic', water_resistance: '300m', power_reserve: '60 hours', crystal: 'Sapphire' },
    stock: 22,
    featured: true,
  },
  {
    id: '3',
    name: 'Celestial Dress',
    slug: 'celestial-dress',
    price: 15800,
    category: 'dress',
    description: 'Understated elegance for the modern connoisseur. The Celestial Dress watch features an ultra-thin 7.2mm case, guilloche dial, and hand-stitched alligator strap.',
    images: ['/watches/watch-6.png', '/watches/watch-7.png'],
    specs: { case: '39mm Rose Gold', movement: 'Manual Wind', water_resistance: '30m', power_reserve: '48 hours', crystal: 'Sapphire' },
    stock: 8,
    featured: true,
  },
  {
    id: '4',
    name: 'Apex Skeleton',
    slug: 'apex-skeleton',
    price: 22000,
    category: 'skeleton',
    description: 'A window into mechanical artistry. The Apex Skeleton reveals its intricate movement through a fully skeletonized dial, each bridge hand-engraved by our master artisans.',
    images: ['/watches/watch-8.png'],
    specs: { case: '41mm Platinum', movement: 'Manual Skeleton', water_resistance: '50m', power_reserve: '80 hours', crystal: 'Sapphire' },
    stock: 5,
    featured: true,
  },
  {
    id: '5',
    name: 'Meridian GMT',
    slug: 'meridian-gmt',
    price: 11200,
    category: 'chronograph',
    description: 'For the global traveler. The Meridian GMT tracks two time zones simultaneously with an independently adjustable hour hand and bi-color ceramic bezel.',
    images: ['/watches/watch-9.png'],
    specs: { case: '40mm Steel', movement: 'Automatic GMT', water_resistance: '100m', power_reserve: '70 hours', crystal: 'Sapphire' },
    stock: 18,
    featured: false,
  },
  {
    id: '6',
    name: 'Heritage Classic',
    slug: 'heritage-classic',
    price: 6500,
    category: 'dress',
    description: 'Timeless design meets modern engineering. The Heritage Classic pays homage to our founding collection with a clean white dial, dauphine hands, and domed crystal.',
    images: ['/watches/watch-10.png'],
    specs: { case: '38mm Steel', movement: 'Automatic', water_resistance: '50m', power_reserve: '56 hours', crystal: 'Domed Sapphire' },
    stock: 30,
    featured: false,
  },
];
