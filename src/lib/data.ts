import type { Product, Category, Policy } from './types';

const categories: Category[] = [
  { id: '1', name: 'TWS Earbuds', slug: 'tws-earbuds', image: 'https://placehold.co/400x300' },
  { id: '2', name: 'Power Banks', slug: 'power-banks', image: 'https://placehold.co/400x300' },
  { id: '3', name: 'USB Cables', slug: 'usb-cables', image: 'https://placehold.co/400x300' },
  { id: '4', name: 'Mobile Covers', slug: 'mobile-covers', image: 'https://placehold.co/400x300' },
];

const products: Product[] = [
  {
    id: '1',
    name: 'AeroSound Pro TWS Earbuds',
    price: 999,
    originalPrice: 1299,
    description: 'Experience true wireless freedom with AeroSound Pro. Featuring Active Noise Cancellation and a 30-hour battery life, these earbuds are designed for immersive sound and all-day comfort.',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'TWS Earbuds',
    categorySlug: 'tws-earbuds',
    brand: 'AeroSound',
    stockStatus: 'In Stock',
    rating: 4.5,
    reviewCount: 150,
    features: ['Active Noise Cancellation', '30-Hour Battery Life', 'IPX5 Water Resistant', 'Bluetooth 5.3'],
    specifications: {
      'Bluetooth Version': '5.3',
      'Driver Size': '10mm',
      'Battery Life': '30 hours (with case)',
      'ANC': 'Yes',
      'Water Resistance': 'IPX5',
    },
  },
  {
    id: '2',
    name: 'ChargeMax 20000mAh Power Bank',
    price: 1499,
    originalPrice: 1999,
    description: 'Never run out of power with the ChargeMax 20000mAh Power Bank. With 100W fast charging support and multiple ports, it can charge your laptop, phone, and other devices simultaneously.',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'Power Banks',
    categorySlug: 'power-banks',
    brand: 'ChargeMax',
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 210,
    features: ['20000mAh Capacity', '100W PD Fast Charging', '3 Output Ports', 'LED Display'],
    specifications: {
      'Capacity': '20000mAh',
      'Output': '100W Max (Type-C)',
      'Input': '65W Max (Type-C)',
      'Ports': '2x USB-A, 1x USB-C',
      'Weight': '380g',
    },
  },
    {
    id: '3',
    name: 'DuraWeave USB-C to USB-C Cable',
    price: 399,
    description: 'The DuraWeave cable is built to last. Its braided nylon exterior and reinforced connectors ensure durability, while supporting up to 100W charging for your devices.',
    images: ['https://placehold.co/600x600'],
    category: 'USB Cables',
    categorySlug: 'usb-cables',
    brand: 'DuraWeave',
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewCount: 500,
    features: ['100W Power Delivery', 'Braided Nylon Exterior', '2 Meter Length', '480Mbps Data Transfer'],
    specifications: {
      'Connector': 'USB-C to USB-C',
      'Length': '2m',
      'Max Power': '100W',
      'Data Speed': '480Mbps',
    },
  },
  {
    id: '4',
    name: 'CrystalShield Case for iPhone 15',
    price: 599,
    originalPrice: 799,
    description: 'Protect your iPhone 15 without hiding its beauty. The CrystalShield case offers military-grade drop protection with a crystal-clear, anti-yellowing finish.',
    images: ['https://placehold.co/600x600'],
    category: 'Mobile Covers',
    categorySlug: 'mobile-covers',
    brand: 'CrystalShield',
    stockStatus: 'Low Stock',
    rating: 4.6,
    reviewCount: 85,
    features: ['Crystal-Clear Finish', 'Military-Grade Protection', 'Anti-Yellowing Material', 'Wireless Charging Compatible'],
    specifications: {
        'Compatibility': 'iPhone 15',
        'Material': 'TPU + Polycarbonate',
        'Drop Protection': '6 ft',
    },
  },
  // Add more products to make it 8
    {
    id: '5',
    name: 'SoundPod Lite TWS',
    price: 799,
    description: 'Affordable, reliable, and great-sounding. The SoundPod Lite offers a compact design and 20 hours of total playtime, perfect for daily use.',
    images: ['https://placehold.co/600x600'],
    category: 'TWS Earbuds',
    categorySlug: 'tws-earbuds',
    brand: 'SoundPod',
    stockStatus: 'In Stock',
    rating: 4.2,
    reviewCount: 320,
    features: ['Compact & Lightweight', '20-Hour Battery Life', 'Touch Controls', 'Bluetooth 5.2'],
    specifications: {
      'Bluetooth Version': '5.2',
      'Driver Size': '8mm',
      'Battery Life': '20 hours (with case)',
      'ANC': 'No',
      'Water Resistance': 'IPX4',
    },
  },
  {
    id: '6',
    name: 'PowerMini 10000mAh Power Bank',
    price: 899,
    description: 'The perfect travel companion. The PowerMini is a pocket-sized 10000mAh power bank with 20W fast charging to keep your phone topped up on the go.',
    images: ['https://placehold.co/600x600'],
    category: 'Power Banks',
    categorySlug: 'power-banks',
    brand: 'ChargeMax',
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewCount: 450,
    features: ['10000mAh Capacity', '20W PD Fast Charging', 'Pocket-Sized', 'Dual Output'],
    specifications: {
      'Capacity': '10000mAh',
      'Output': '20W Max (Type-C)',
      'Input': '18W Max (Type-C)',
      'Ports': '1x USB-A, 1x USB-C',
      'Weight': '195g',
    },
  },
  {
    id: '7',
    name: 'FlexLink USB-A to Lightning Cable',
    price: 499,
    description: 'MFi-certified for your Apple devices. The FlexLink cable is designed for durability and reliable charging for your iPhone, iPad, or AirPods.',
    images: ['https://placehold.co/600x600'],
    category: 'USB Cables',
    categorySlug: 'usb-cables',
    brand: 'DuraWeave',
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 980,
    features: ['MFi Certified', 'Reinforced Connectors', '1.5 Meter Length', 'Durable TPE material'],
    specifications: {
      'Connector': 'USB-A to Lightning',
      'Length': '1.5m',
      'Max Power': '12W',
      'Data Speed': '480Mbps',
    },
  },
  {
    id: '8',
    name: 'Guardian Case for Samsung S24',
    price: 649,
    description: 'The Guardian case provides rugged protection with a slim profile. Its textured grip and raised bezels protect your Samsung S24 from drops and scratches.',
    images: ['https://placehold.co/600x600'],
    category: 'Mobile Covers',
    categorySlug: 'mobile-covers',
    brand: 'Guardian',
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewCount: 120,
    features: ['Rugged Protection', 'Slim Profile', 'Textured Grip', 'Raised Bezels'],
    specifications: {
        'Compatibility': 'Samsung Galaxy S24',
        'Material': 'TPU',
        'Drop Protection': '8 ft',
    },
  }
];

const policies: Policy[] = [
    {
      slug: 'terms-and-conditions',
      title: 'Terms & Conditions',
      lastUpdated: 'January 1, 2024',
      content: `
        <h2 class="text-2xl font-headline mb-4">1. Introduction</h2>
        <p class="mb-4">Welcome to ElectroCart. These are the terms and conditions governing your access to and use of the website ElectroCart and its related sub-domains, sites, services and tools.</p>
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
          <p class="mb-4">All products sold on ElectroCart come with a standard 1-year manufacturer warranty against manufacturing defects, unless specified otherwise on the product page.</p>
          <h2 class="text-2xl font-headline mb-4">Claim Process</h2>
          <p class="mb-4">To claim warranty, please contact our customer support with your order details and a description of the issue. We will guide you through the process, which may involve contacting the manufacturer's service center.</p>
        `,
      },
];

export function getCategories(): Category[] {
  return categories;
}

export function getProducts(categorySlug?: string): Product[] {
  if (categorySlug) {
    return products.filter(p => p.categorySlug === categorySlug);
  }
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function findProductsByNames(names: string[]): Product[] {
    return products.filter(p => names.includes(p.name));
}

export function getPolicies(): Policy[] {
    return policies;
}

export function getPolicyBySlug(slug: string): Policy | undefined {
    return policies.find(p => p.slug === slug);
}
