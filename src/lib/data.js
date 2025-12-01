
const categories = [
  { id: '1', name: 'Soaps', slug: 'soaps', image: 'https://placehold.co/400x300' },
  { id: '2', name: 'Deodorants', slug: 'deodorants', image: 'https://placehold.co/400x300' },
  { id: '3', name: 'Bodywash', slug: 'bodywash', image: 'https://placehold.co/400x300' },
];

const products = [
  {
    id: '1',
    name: 'Charcoal & Tea Tree Soap',
    price: 499,
    originalPrice: 599,
    description: 'A deep-cleansing, handcrafted soap with activated charcoal and tea tree oil to detoxify and clarify your skin. Perfect for oily and acne-prone skin types.',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'Soaps',
    categorySlug: 'soaps',
    brand: 'Cj.Drk Naturals',
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 210,
    features: ['Detoxifying Activated Charcoal', 'Antibacterial Tea Tree Oil', 'Cold-Pressed', 'Vegan & Cruelty-Free'],
    specifications: {
      'Weight': '100g',
      'Skin Type': 'Oily, Acne-Prone',
      'Fragrance': 'Earthy & Medicated',
      'Ingredients': 'Coconut Oil, Olive Oil, Activated Charcoal, Tea Tree Essential Oil',
    },
  },
  {
    id: '2',
    name: 'Lavender & Shea Butter Soap',
    price: 499,
    description: 'A calming and moisturizing soap bar infused with French lavender and nourishing shea butter. Gently cleanses while leaving your skin soft and hydrated.',
    images: ['https://placehold.co/600x600'],
    category: 'Soaps',
    categorySlug: 'soaps',
    brand: 'Cj.Drk Naturals',
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewCount: 350,
    features: ['Calming French Lavender', 'Moisturizing Shea Butter', 'Gentle Formula', 'Sulfate-Free'],
    specifications: {
      'Weight': '100g',
      'Skin Type': 'All Skin Types, Dry',
      'Fragrance': 'Floral & Relaxing',
      'Ingredients': 'Coconut Oil, Shea Butter, Lavender Essential Oil',
    },
  },
    {
    id: '3',
    name: 'Sandalwood & Bergamot Deodorant',
    price: 799,
    description: 'Stay fresh naturally with our aluminum-free deodorant. A sophisticated blend of warm sandalwood and citrusy bergamot keeps you odor-free all day.',
    images: ['https://placehold.co/600x600'],
    category: 'Deodorants',
    categorySlug: 'deodorants',
    brand: 'Cj.Drk Naturals',
    stockStatus: 'In Stock',
    rating: 4.6,
    reviewCount: 180,
    features: ['Aluminum-Free', 'All-Day Odor Protection', 'No Baking Soda', 'Glides on Smooth'],
    specifications: {
      'Size': '75g',
      'Scent': 'Woody & Citrus',
      'Key Ingredients': 'Magnesium Hydroxide, Arrowroot Powder, Coconut Oil',
      'Application': 'Stick',
    },
  },
  {
    id: '4',
    name: 'Eucalyptus & Mint Bodywash',
    price: 899,
    originalPrice: 999,
    description: 'Awaken your senses with this invigorating bodywash. The cooling sensation of eucalyptus and mint essential oils will leave you feeling refreshed and energized.',
    images: ['https://placehold.co/600x600'],
    category: 'Bodywash',
    categorySlug: 'bodywash',
    brand: 'Cj.Drk Naturals',
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewCount: 150,
    features: ['Invigorating Scent', 'Sulfate-Free Cleansers', 'Rich Lather', 'pH Balanced'],
    specifications: {
        'Volume': '250ml',
        'Scent': 'Fresh & Minty',
        'Key Ingredients': 'Aloe Vera Juice, Eucalyptus Oil, Peppermint Oil',
        'Packaging': 'Recycled Plastic Bottle',
    },
  },
  {
    id: '5',
    name: 'Rose & Clay Gentle Soap',
    price: 549,
    description: 'A gentle, romantic soap made with rose clay and geranium essential oil. This bar cleanses without stripping, leaving skin feeling soft and looking radiant.',
    images: ['https://placehold.co/600x600'],
    category: 'Soaps',
    categorySlug: 'soaps',
    brand: 'Cj.Drk Naturals',
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 280,
    features: ['Purifying Rose Clay', 'Romantic Geranium Scent', 'For Sensitive Skin', 'Handmade in Small Batches'],
    specifications: {
      'Weight': '100g',
      'Skin Type': 'Sensitive, Normal',
      'Fragrance': 'Floral',
      'Ingredients': 'Olive Oil, Coconut Oil, Rose Clay, Geranium Oil',
    },
  },
  {
    id: '6',
    name: 'Unscented Natural Deodorant',
    price: 749,
    description: 'Our most gentle deodorant for sensitive skin. This fragrance-free and baking soda-free formula provides effective odor protection without irritation.',
    images: ['https://placehold.co/600x600'],
    category: 'Deodorants',
    categorySlug: 'deodorants',
    brand: 'Cj.Drk Naturals',
    stockStatus: 'Low Stock',
    rating: 4.5,
    reviewCount: 120,
    features: ['Fragrance-Free', 'Aluminum-Free', 'Baking Soda-Free', 'For Ultra-Sensitive Skin'],
    specifications: {
      'Size': '75g',
      'Scent': 'None',
      'Key Ingredients': 'Magnesium Hydroxide, Coconut Oil, Shea Butter',
      'Application': 'Stick',
    },
  },
  {
    id: '7',
    name: 'Citrus Burst Energizing Bodywash',
    price: 899,
    description: 'Start your day with a splash of sunshine. This bodywash is packed with lemon, orange, and grapefruit essential oils for a bright, energizing cleanse.',
    images: ['https://placehold.co/600x600'],
    category: 'Bodywash',
    categorySlug: 'bodywash',
    brand: 'Cj.Drk Naturals',
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewCount: 220,
    features: ['Uplifting Citrus Aroma', 'Gentle Coconut-Based Cleansers', 'Vitamin C Rich', 'Paraben-Free'],
    specifications: {
      'Volume': '250ml',
      'Scent': 'Bright & Citrusy',
      'Key Ingredients': 'Sweet Orange Oil, Lemon Peel Oil, Grapefruit Oil',
      'Packaging': 'Recycled Plastic Bottle',
    },
  },
  {
    id: '8',
    name: 'Oatmeal & Honey Soothing Soap',
    price: 549,
    description: 'The ultimate comfort soap. Made with colloidal oatmeal and real honey, it soothes irritated skin, reduces inflammation, and provides gentle exfoliation.',
    images: ['https://placehold.co/600x600'],
    category: 'Soaps',
    categorySlug: 'soaps',
    brand: 'Cj.Drk Naturals',
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewCount: 410,
    features: ['Soothing Colloidal Oatmeal', 'Nourishing Honey', 'Fragrance-Free', 'Ideal for Eczema/Psoriasis'],
    specifications: {
        'Weight': '100g',
        'Skin Type': 'Dry, Irritated, Sensitive',
        'Fragrance': 'Natural Honey & Oat',
        'Ingredients': 'Saponified Oils, Colloidal Oatmeal, Honey',
    },
  }
];

const policies = [
    {
      slug: 'terms-and-conditions',
      title: 'Terms & Conditions',
      lastUpdated: 'January 1, 2024',
      content: `
        <h2 class="text-2xl font-headline mb-4">1. Introduction</h2>
        <p class="mb-4">Welcome to Cj.Drk. These are the terms and conditions governing your access to and use of the website Cj.Drk and its related sub-domains, sites, services and tools.</p>
        <h2 class="text-2xl font-headline mb-4">2. User Account</h2>
        <p class="mb-4">You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.</p>
        <h2 class="text-2xl font-headline mb-4">3. Privacy</h2>
        <p class="mb-4">Please review our Privacy Policy, which also governs your visit to the Site. The personal information / data provided to us by you or your use of the Site will be treated as strictly confidential.</p>
      `,
    },
    {
      slug: 'privacy-policy',
      title: 'Privacy Policy',
      lastUpdated: 'January 1, 2024',
      content: `
        <h2 class="text-2xl font-headline mb-4">Information We Collect</h2>
        <p class="mb-4">We collect information you provide directly to us, such as when you create an account, place an order, or contact customer service. This may include your name, email, phone number, and shipping address.</p>
        <h2 class="text-2xl font-headline mb-4">How We Use Information</h2>
        <p class="mb-4">We use the information we collect to process your orders, communicate with you, and improve our services. We do not sell your personal information to third parties.</p>
      `,
    },
    {
        slug: 'shipping-policy',
        title: 'Shipping Policy',
        lastUpdated: 'January 1, 2024',
        content: `
          <h2 class="text-2xl font-headline mb-4">Processing Time</h2>
          <p class="mb-4">Orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
          <h2 class="text-2xl font-headline mb-4">Shipping Rates & Delivery Estimates</h2>
          <p class="mb-4">Shipping charges for your order will be calculated and displayed at checkout. Delivery estimates are typically 3-7 business days, depending on your location.</p>
        `,
      },
    {
      slug: 'return-and-refund-policy',
      title: 'Return & Refund Policy',
      lastUpdated: 'January 1, 2024',
      content: `
        <h2 class="text-2xl font-headline mb-4">Returns</h2>
        <p class="mb-4">We have a 7-day return policy, which means you have 7 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unused, with tags, and in its original packaging.</p>
        <h2 class="text-2xl font-headline mb-4">Refunds</h2>
        <p class="mb-4">We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days.</p>
      `,
    },
    {
        slug: 'warranty-information',
        title: 'Warranty Information',
        lastUpdated: 'January 1, 2024',
        content: `
          <h2 class="text-2xl font-headline mb-4">Standard Warranty</h2>
          <p class="mb-4">All products sold on Cj.Drk come with a standard 1-year manufacturer warranty against manufacturing defects, unless specified otherwise on the product page.</p>
          <h2 class="text-2xl font-headline mb-4">Claim Process</h2>
          <p class="mb-4">To claim warranty, please contact our customer support with your order details and a description of the issue. We will guide you through the process, which may involve contacting the manufacturer's service center.</p>
        `,
      },
];

const analyticsData = {
    totalRevenue: 45231.89,
    revenueChange: 20.1,
    subscriptions: 2350,
    subscriptionsChange: 180.1,
    sales: 12234,
    salesChange: 19,
    activeNow: 573,
    activeNowChange: '+201',
    recentTransactions: [
        { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: 1999.00 },
        { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: 39.00 },
        { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: 299.00 },
        { name: 'William Kim', email: 'will@email.com', amount: 99.00 },
        { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: 39.00 },
    ],
    recentSales: [
        { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: 1999.00 },
        { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: 39.00 },
        { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: 299.00 },
        { name: 'William Kim', email: 'will@email.com', amount: 99.00 },
        { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: 39.00 },
    ],
    salesByMonth: [
        { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
    ]
};

export function getCategories() {
  return categories;
}

export function getProducts(categorySlug) {
  if (categorySlug) {
    return products.filter(p => p.categorySlug === categorySlug);
  }
  return products;
}

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function findProductsByNames(names) {
    return products.filter(p => names.includes(p.name));
}

export function getPolicies() {
    return policies;
}

export function getPolicyBySlug(slug) {
    return policies.find(p => p.slug === slug);
}


export function getAnalyticsData() {
    return analyticsData;
}
