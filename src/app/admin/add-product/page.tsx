'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { useToast } from '../../../hooks/use-toast';
import { PlusCircle, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, DocumentData, serverTimestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  mrp: z.coerce.number().optional(),
  category_id: z.string({ required_error: 'Please select a category.' }),
  images: z.array(z.string().url('Must be a valid URL')).min(1, 'At least one image URL is required.'),
  tags: z.array(z.object({ value: z.string().min(1, 'Tag cannot be empty.') })),
  stock_quantity: z.coerce.number().min(0, 'Stock must be a positive number.'),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface Category extends DocumentData {
  id: string;
  name: string;
  slug: string;
}

const AddProductForm = () => {
    const { toast } = useToast();
    const firestore = useFirestore();

    // In a real app, categories would also be managed in the admin dashboard.
    // For now, we'll use a hardcoded list that matches our intended Firestore structure.
    const categories: Category[] = [
        { id: 'soaps', name: 'Soaps', slug: 'soaps' },
        { id: 'perfumes', name: 'Perfumes', slug: 'perfumes' },
        { id: 'serums', name: 'Serums', slug: 'serums' },
    ];

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            mrp: undefined,
            category_id: '',
            images: [''],
            tags: [{ value: '' }],
            stock_quantity: 0,
        },
    });

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control: form.control,
        name: "images"
    });

    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
        control: form.control,
        name: "tags"
    });


    const onSubmit = async (data: ProductFormValues) => {
        try {
            const productsRef = collection(firestore, 'products');
            
            const productData = {
              active: true,
              name: data.name,
              slug: data.name.toLowerCase().replace(/\s+/g, '-'),
              description: data.description,
              price: data.price,
              mrp: data.mrp || data.price,
              currency: 'INR',
              category_id: data.category_id,
              images: data.images,
              tags: data.tags.map(t => t.value),
              stock_quantity: data.stock_quantity,
              // Adding default values for fields not in the form
              weight_kg: 0.12, 
              dimensions: { length_cm: 8, breadth_cm: 6, height_cm: 2.5 },
              has_variants: false,
              sku: `CJD-${data.category_id.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
              created_at: serverTimestamp(),
              updated_at: serverTimestamp(),
            };

            await addDocumentNonBlocking(productsRef, productData);

            toast({
                title: 'Product Added!',
                description: `${data.name} has been successfully added.`,
            });
            form.reset();
            // Reset field arrays
            form.setValue('images', ['']);
            form.setValue('tags', [{value: ''}]);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to add the product. Please try again.',
                variant: 'destructive',
            });
            console.error(error);
        }
    };
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input {...field} placeholder="e.g., Charcoal & Tea Tree Soap" /></FormControl><FormMessage /></FormItem>
              )} />
              
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="Describe the product..." /></FormControl><FormMessage /></FormItem>
              )} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem><FormLabel>Price (INR)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="mrp" render={({ field }) => (
                  <FormItem><FormLabel>MRP (Optional, INR)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="category_id" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                            <SelectContent>
                                {categories?.map(cat => (
                                    <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                 )} />
                 <FormField control={form.control} name="stock_quantity" render={({ field }) => (
                  <FormItem><FormLabel>Stock Quantity</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              
            <div>
                <FormLabel>Image URLs</FormLabel>
                {imageFields.map((field, index) => (
                    <FormField
                    key={field.id}
                    control={form.control}
                    name={`images.${index}`}
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2 mt-2">
                            <FormControl><Input {...field} placeholder="https://picsum.photos/seed/p1/600/600" /></FormControl>
                            {imageFields.length > 1 && <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(index)}><Trash2/></Button>}
                        </FormItem>
                    )}
                    />
                ))}
                <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendImage('')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Image URL
                </Button>
            </div>
            
            <div>
                <FormLabel>Tags</FormLabel>
                {tagFields.map((field, index) => (
                    <FormField
                    key={field.id}
                    control={form.control}
                    name={`tags.${index}.value`}
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2 mt-2">
                        <FormControl><Input {...field} placeholder="e.g., detox" /></FormControl>
                        {tagFields.length > 1 && <Button type="button" variant="destructive" size="icon" onClick={() => removeTag(index)}><Trash2/></Button>}
                        </FormItem>
                    )}
                    />
                ))}
                 <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendTag({ value: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Tag
                </Button>
            </div>

              <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Adding Product...' : 'Add Product'}
              </Button>
            </form>
        </Form>
    )
}


export default function AdminProductUploadPage() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
            <CardTitle className="font-headline text-3xl">Add New Product</CardTitle>
            <CardDescription>Fill out the form below to add a new product to your store.</CardDescription>
            </CardHeader>
            <CardContent>
                {isClient ? <AddProductForm/> : (
                    <div className="space-y-8">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <div className="grid grid-cols-2 gap-8">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="grid grid-cols-2 gap-8">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                )}
            </CardContent>
        </Card>
        </div>
    );
}
