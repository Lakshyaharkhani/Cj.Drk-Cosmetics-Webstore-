
require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, writeBatch, Timestamp } = require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productsToSeed = [
    {
        id: 'charcoal-tea-tree-soap',
        active: true,
        name: 'Charcoal & Tea Tree Soap',
        slug: 'charcoal-tea-tree-soap',
        description: 'A deep-cleansing, handcrafted soap with activated charcoal and tea tree oil to detoxify and clarify your skin. Perfect for oily and acne-prone skin types.',
        price: 499,
        mrp: 599,
        currency: 'INR',
        sku: 'CJD-SOAP-CTT-100G',
        stock_quantity: 50,
        weight_kg: 0.12, // 100g product + 20g packaging
        dimensions: {
            length_cm: 8,
            breadth_cm: 6,
            height_cm: 2.5,
        },
        category_id: 'soaps', // Will match a category doc id later
        tags: ['detox', 'acne', 'oily skin', 'handmade'],
        images: ['https://picsum.photos/seed/p1/600/600', 'https://picsum.photos/seed/p1-t1/600/600'],
        has_variants: false,
        created_at: Timestamp.now().toMillis(),
        updated_at: Timestamp.now().toMillis(),
    },
    {
        id: 'lavender-shea-butter-soap',
        active: true,
        name: 'Lavender & Shea Butter Soap',
        slug: 'lavender-shea-butter-soap',
        description: 'A calming and moisturizing soap bar infused with French lavender and nourishing shea butter. Gently cleanses while leaving your skin soft and hydrated.',
        price: 549,
        mrp: 599,
        currency: 'INR',
        sku: 'CJD-SOAP-LSB-100G',
        stock_quantity: 35,
        weight_kg: 0.12,
        dimensions: {
            length_cm: 8,
            breadth_cm: 6,
            height_cm: 2.5,
        },
        category_id: 'soaps',
        tags: ['moisturizing', 'calming', 'dry skin', 'handmade'],
        images: ['https://picsum.photos/seed/p2/600/600'],
        has_variants: false,
        created_at: Timestamp.now().toMillis(),
        updated_at: Timestamp.now().toMillis(),
    },
    {
        id: 'sandalwood-bergamot-perfume',
        active: true,
        name: 'Sandalwood & Bergamot Solid Perfume',
        slug: 'sandalwood-bergamot-perfume',
        description: 'A sophisticated solid perfume with warm sandalwood and citrusy bergamot. A long-lasting, subtle fragrance in a travel-friendly tin.',
        price: 799,
        mrp: 999,
        currency: 'INR',
        sku: 'CJD-PERF-SAB-15G',
        stock_quantity: 25,
        weight_kg: 0.05, // 15g product + packaging
        dimensions: {
            length_cm: 5,
            breadth_cm: 5,
            height_cm: 2,
        },
        category_id: 'perfumes',
        tags: ['woody', 'citrus', 'natural perfume', 'unisex'],
        images: ['https://picsum.photos/seed/p3/600/600'],
        has_variants: false,
        created_at: Timestamp.now().toMillis(),
        updated_at: Timestamp.now().toMillis(),
    },
     {
        id: 'vitamin-c-glow-serum',
        active: true,
        name: 'Vitamin C Glow Serum',
        slug: 'vitamin-c-glow-serum',
        description: 'Brighten and even your skin tone with our potent Vitamin C Glow Serum. Fights free radicals and boosts collagen for a youthful radiance.',
        price: 1299,
        mrp: 1499,
        currency: 'INR',
        sku: 'CJD-SERUM-VTC-30ML',
        stock_quantity: 40,
        weight_kg: 0.09, // 30ml product + glass bottle
        dimensions: {
            length_cm: 4,
            breadth_cm: 4,
            height_cm: 10,
        },
        category_id: 'serums',
        tags: ['brightening', 'anti-aging', 'vitamin c', 'radiance'],
        images: ['https://picsum.photos/seed/p4/600/600'],
        has_variants: false,
        created_at: Timestamp.now().toMillis(),
        updated_at: Timestamp.now().toMillis(),
    },
];


async function seedDatabase() {
  const productsCollection = collection(db, 'products');
  
  if (productsToSeed.length === 0) {
    console.log('No products found to seed.');
    return;
  }

  const batch = writeBatch(db);

  productsToSeed.forEach((product) => {
    // We use the product's original ID as the document ID in Firestore
    const docRef = doc(productsCollection, product.id);
    // We remove the `id` field from the object, as it's now the document ID
    const { id, ...productData } = product;
    batch.set(docRef, productData);
  });

  try {
    await batch.commit();
    console.log(`Successfully seeded ${productsToSeed.length} products.`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Firebase doesn't have a simple "close connection" for the client SDK,
    // so we'll just exit the process.
    process.exit(0);
  }
}

seedDatabase();
