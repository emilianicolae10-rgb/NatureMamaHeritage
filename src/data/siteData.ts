export const products = [
  {
    id: 1,
    name: 'Heritage Honey Blend',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600',
    category: 'Honey',
    description: 'Raw, unfiltered honey sourced from wildflower meadows.',
    tags: ['organic', 'raw', 'wildflower'],
  },
  {
    id: 2,
    name: 'Herbal Calm Tea',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600',
    category: 'Tea',
    description: 'A soothing blend of chamomile, lavender, and lemon balm.',
    tags: ['herbal', 'calming', 'caffeine-free'],
  },
  {
    id: 3,
    name: 'Shea Butter Balm',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600',
    category: 'Skincare',
    description: 'Pure shea butter enriched with essential oils for deep nourishment.',
    tags: ['moisturizing', 'natural', 'handmade'],
  },
  {
    id: 4,
    name: 'Moringa Powder',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600',
    category: 'Superfoods',
    description: 'Nutrient-dense moringa leaf powder from sustainable farms.',
    tags: ['superfood', 'organic', 'energy'],
  },
  {
    id: 5,
    name: 'Lavender Essential Oil',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600',
    category: 'Aromatherapy',
    description: 'Pure lavender oil distilled from heritage lavender fields.',
    tags: ['relaxing', 'pure', 'therapeutic'],
  },
  {
    id: 6,
    name: 'Baobab Fruit Snack',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1473348700950-4c3c1a680a52?w=600',
    category: 'Snacks',
    description: 'Dried baobab fruit bites packed with vitamin C and fiber.',
    tags: ['snack', 'vitamin-c', 'natural'],
  },
];

export const testimonials = [
  {
    name: 'Amara J.',
    text: 'NatureMama Heritage changed my skincare routine forever. The shea butter balm is divine.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    name: 'Liam K.',
    text: 'The honey blend is the best I have ever tasted. You can feel the quality in every spoonful.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
  {
    name: 'Sofia R.',
    text: 'I love the mission behind this brand. Sustainable, ethical, and the products are amazing.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    name: 'David M.',
    text: 'The herbal tea collection helps me unwind every evening. Truly a heritage experience.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/100?img=8',
  },
];

export const timelineEvents = [
  { year: '2010', title: 'The Seed is Planted', description: 'Founded in a small village kitchen with a passion for natural remedies passed down through generations.' },
  { year: '2013', title: 'First Market Stall', description: 'Launched at local farmers markets, quickly gaining a loyal following for our honey and herbal teas.' },
  { year: '2016', title: 'Online Expansion', description: 'Took our heritage products online, reaching customers across the country.' },
  { year: '2019', title: 'Sustainability Pledge', description: 'Committed to 100% sustainable sourcing and zero-waste packaging.' },
  { year: '2022', title: 'International Reach', description: 'Expanded to international markets, sharing our heritage with the world.' },
  { year: '2025', title: 'Community Hub', description: 'Opened our flagship store and community wellness center.' },
];

export const stats = [
  { value: 50000, suffix: '+', label: 'Happy Customers' },
  { value: 100, suffix: '%', label: 'Natural Ingredients' },
  { value: 15, suffix: '+', label: 'Years of Heritage' },
  { value: 30, suffix: '+', label: 'Product Lines' },
];

export const locations = [
  { name: 'Flagship Store — Nairobi', lat: -1.2921, lng: 36.8219 },
  { name: 'Wellness Center — Cape Town', lat: -33.9249, lng: 18.4241 },
  { name: 'Pop-up — London', lat: 51.5074, lng: -0.1278 },
];

export const galleryImages = [
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600',
  'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=600',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600',
  'https://images.unsplash.com/photo-1501004318855-e73f5c6e42dd?w=600',
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600',
  'https://images.unsplash.com/photo-1474524955719-b9f87c50ce47?w=600',
];

export const quizQuestions = [
  {
    question: 'What is your primary wellness goal?',
    options: [
      { text: 'Better skin health', tags: ['skincare'] },
      { text: 'More energy & vitality', tags: ['superfoods', 'snack'] },
      { text: 'Relaxation & calm', tags: ['calming', 'relaxing'] },
      { text: 'Overall nutrition', tags: ['organic', 'superfood'] },
    ],
  },
  {
    question: 'How do you prefer to incorporate wellness into your routine?',
    options: [
      { text: 'Morning rituals (tea, smoothies)', tags: ['herbal', 'superfood'] },
      { text: 'Skincare & body care', tags: ['moisturizing', 'handmade'] },
      { text: 'Aromatherapy & ambiance', tags: ['therapeutic', 'pure'] },
      { text: 'Healthy snacking', tags: ['snack', 'vitamin-c', 'natural'] },
    ],
  },
  {
    question: 'What matters most to you in a product?',
    options: [
      { text: 'Purity & raw ingredients', tags: ['raw', 'pure', 'organic'] },
      { text: 'Handcrafted quality', tags: ['handmade', 'natural'] },
      { text: 'Sustainability', tags: ['organic', 'natural'] },
      { text: 'Great taste', tags: ['wildflower', 'snack'] },
    ],
  },
];
