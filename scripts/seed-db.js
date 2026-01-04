
require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, writeBatch } = require('firebase/firestore');

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
        name: 'Charcoal & Tea Tree Soap',
        price: 499,
        originalPrice: 599,
        category: 'soaps',
        description: 'A deep-cleansing, handcrafted soap with activated charcoal and tea tree oil to detoxify and clarify your skin. Perfect for oily and acne-prone skin types.',
        image: 'https://picsum.photos/seed/p1/600/600',
        thumbnails: ['https://picsum.photos/seed/p1-t1/150/150', 'https://picsum.photos/seed/p1-t2/150/150'],
        rating: 4.8,
        reviews: 210,
        isBestSeller: true,
    },
    {
        id: 'lavender-shea-butter-soap',
        name: 'Lavender & Shea Butter Soap',
        price: 499,
        category: 'soaps',
        description: 'A calming and moisturizing soap bar infused with French lavender and nourishing shea butter. Gently cleanses while leaving your skin soft and hydrated.',
        image: 'https://picsum.photos/seed/p2/600/600',
        thumbnails: ['https://picsum.photos/seed/p2-t1/150/150'],
        rating: 4.9,
        reviews: 350,
        isNew: true,
    },
    {
        id: 'sandalwood-bergamot-perfume',
        name: 'Sandalwood & Bergamot Solid Perfume',
        price: 799,
        category: 'perfumes',
        description: 'Stay fresh naturally with our aluminum-free deodorant. A sophisticated blend of warm sandalwood and citrusy bergamot keeps you odor-free all day.',
        image: 'https://picsum.photos/seed/p3/600/600',
        thumbnails: ['https://picsum.photos/seed/p3-t1/150/150'],
        rating: 4.6,
        reviews: 180,
    },
    {
        id: 'vitamin-c-serum',
        name: 'Vitamin C Glow Serum',
        price: 1299,
        originalPrice: 1499,
        category: 'serums',
        description: 'Awaken your senses with this invigorating bodywash. The cooling sensation of eucalyptus and mint essential oils will leave you feeling refreshed and energized.',
        image: 'https://picsum.photos/seed/p4/600/600',
        thumbnails: ['https://picsum.photos/seed/p4-t1/150/150'],
        rating: 4.7,
        reviews: 150,
        isSale: true,
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
