
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
import { collection, DocumentData } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  originalPrice: z.coerce.number().optional(),
  brand: z.string().min(2, 'Brand is required.'),
  categorySlug: z.string({ required_error: 'Please select a category.' }),
  stockStatus: z.enum(['In Stock', 'Low Stock', 'Out of Stock']),
  images: z.array(z.string().url('Must be a valid URL')).min(1, 'At least one image URL is required.'),
  features: z.array(z.object({ value: z.string().min(1, 'Feature cannot be empty.') })),
  specifications: z.array(z.object({
    key: z.string().min(1, 'Spec key cannot be empty.'),
    value: z.string().min(1, 'Spec value cannot be empty.'),
  })),
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

    const categoriesRef = useMemoFirebase(() => collection(firestore, 'categories'), [firestore]);
    const { data: categories } = useCollection<Category>(categoriesRef);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
        name: '',
        description: '',
        price: 0,
        originalPrice: undefined,
        brand: '',
        categorySlug: '',
        stockStatus: 'In Stock',
        images: [''],
        features: [{ value: '' }],
        specifications: [{ key: '', value: '' }],
        },
    });

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control: form.control,
        name: "images"
    });

    const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
        control: form.control,
        name: "features"
    });

    const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
        control: form.control,
        name: "specifications"
    });


    const onSubmit = async (data: ProductFormValues) => {
        try {
            const productsRef = collection(firestore, 'products');
            const categoryDoc = categories?.find(c => c.slug === data.categorySlug);

            const productData = {
            ...data,
            category: categoryDoc ? categoryDoc.name : 'Uncategorized',
            features: data.features.map(f => f.value),
            specifications: data.specifications.reduce((acc, spec) => {
                acc[spec.key] = spec.value;
                return acc;
            }, {} as Record<string, string>),
            rating: 0, // Initial rating
            reviewCount: 0, // Initial review count
            createdAt: new Date(),
            };

            await addDocumentNonBlocking(productsRef, productData);

            toast({
                title: 'Product Added!',
                description: `${data.name} has been successfully added.`,
            });
            form.reset();
            // Reset field arrays
            form.setValue('images', ['']);
            form.setValue('features', [{value: ''}]);
            form.setValue('specifications', [{key: '', value: ''}]);
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
                <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input {...field} placeholder="e.g., AeroSound Pro TWS Earbuds" /></FormControl><FormMessage /></FormItem>
              )} />
              
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="Describe the product..." /></FormControl><FormMessage /></FormItem>
              )} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem><FormLabel>Price (Rs)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="originalPrice" render={({ field }) => (
                  <FormItem><FormLabel>Original Price (Optional, Rs)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="brand" render={({ field }) => (
                  <FormItem><FormLabel>Brand</FormLabel><FormControl><Input {...field} placeholder="e.g., AeroSound" /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="categorySlug" render={({ field }) => (
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
              </div>
              
              <FormField control={form.control} name="stockStatus" render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Status</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select stock status" /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="In Stock">In Stock</SelectItem>
                            <SelectItem value="Low Stock">Low Stock</SelectItem>
                            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )} />

            <div>
                <FormLabel>Image URLs</FormLabel>
                {imageFields.map((field, index) => (
                    <FormField
                    key={field.id}
                    control={form.control}
                    name={`images.${index}`}
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2 mt-2">
                            <FormControl><Input {...field} placeholder="https://placehold.co/600x600" /></FormControl>
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
                <FormLabel>Features</FormLabel>
                {featureFields.map((field, index) => (
                    <FormField
                    key={field.id}
                    control={form.control}
                    name={`features.${index}.value`}
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2 mt-2">
                        <FormControl><Input {...field} placeholder="e.g., Active Noise Cancellation" /></FormControl>
                        {featureFields.length > 1 && <Button type="button" variant="destructive" size="icon" onClick={() => removeFeature(index)}><Trash2/></Button>}
                        </FormItem>
                    )}
                    />
                ))}
                 <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendFeature({ value: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Feature
                </Button>
            </div>
            
            <div>
                <FormLabel>Specifications</FormLabel>
                {specFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2 mt-2">
                    <FormField control={form.control} name={`specifications.${index}.key`} render={({ field }) => (
                        <FormItem className="flex-1"><FormControl><Input {...field} placeholder="e.g., Bluetooth Version" /></FormControl></FormItem>
                    )} />
                     <FormField control={form.control} name={`specifications.${index}.value`} render={({ field }) => (
                        <FormItem className="flex-1"><FormControl><Input {...field} placeholder="e.g., 5.3" /></FormControl></FormItem>
                    )} />
                    {specFields.length > 1 && <Button type="button" variant="destructive" size="icon" onClick={() => removeSpec(index)}><Trash2/></Button>}
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendSpec({ key: '', value: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Specification
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

    