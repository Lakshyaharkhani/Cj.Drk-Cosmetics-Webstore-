
require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, writeBatch } = require('firebase/firestore');
const { getProducts } = require('../src/lib/data');

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

async function seedDatabase() {
  const productsCollection = collection(db, 'products');
  const productsToSeed = getProducts();

  if (productsToSeed.length === 0) {
    console.log('No products found in data.js to seed.');
    return;
  }

  const batch = writeBatch(db);

  productsToSeed.forEach((product) => {
    // We use the product's original ID as the document ID in Firestore
    const docRef = collection(productsCollection).doc(product.id);
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
