
'use server';

import { v4 as uuidv4 } from 'uuid';
import { getCategories } from '@/lib/data';
import fs from 'fs/promises';
import path from 'path';

export async function addProductAction(productData) {
  const categories = getCategories();
  const category = categories.find(c => c.slug === productData.categorySlug);

  if (!category) {
    throw new Error('Invalid category specified.');
  }

  const newProduct = {
    id: uuidv4(),
    name: productData.name,
    price: productData.price,
    originalPrice: productData.originalPrice || null,
    description: productData.description,
    images: productData.images.filter(img => img.trim() !== ''),
    category: category.name,
    categorySlug: productData.categorySlug,
    brand: productData.brand,
    stockStatus: productData.stockStatus,
    rating: 0, // New products start with 0 rating
    reviewCount: 0, // New products start with 0 reviews
    features: productData.features.map(f => f.value).filter(f => f.trim() !== ''),
    specifications: productData.specifications.reduce((acc, spec) => {
      if (spec.key && spec.value) {
        acc[spec.key] = spec.value;
      }
      return acc;
    }, {}),
  };

  // THIS IS A TEMPORARY SOLUTION FOR THE DEMO
  // In a real application, you would save this to a database.
  // Here, we are modifying the data.js file directly.
  const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.js');
  
  try {
    let fileContent = await fs.readFile(dataFilePath, 'utf-8');
    
    // Create a string representation of the new product object
    const newProductString = `,\n  ${JSON.stringify(newProduct, null, 2).replace(/\n/g, '\n  ')}`;
    
    // Find the position to insert the new product
    const insertionPoint = fileContent.lastIndexOf('];');
    if (insertionPoint === -1) {
        throw new Error("Could not find the products array in data.js");
    }

    // Check if the array is empty to avoid adding a leading comma
     const productsArrayRegex = /const products = \[([\s\S]*?)\];/;
     const match = fileContent.match(productsArrayRegex);
     const productsContent = match ? match[1].trim() : '';
     
     if (productsContent === '') {
        // If empty, don't add a comma
        const productStringWithoutComma = newProductString.substring(1);
        fileContent = fileContent.slice(0, insertionPoint) + productStringWithoutComma + fileContent.slice(insertionPoint);
     } else {
        fileContent = fileContent.slice(0, insertionPoint - 1) + newProductString + fileContent.slice(insertionPoint -1);
     }


    await fs.writeFile(dataFilePath, fileContent, 'utf-8');
    console.log('Product added to data.js');
  } catch (error) {
    console.error('Failed to write to data.js:', error);
    throw new Error('Failed to save the new product.');
  }

  return { success: true, product: newProduct };
}
