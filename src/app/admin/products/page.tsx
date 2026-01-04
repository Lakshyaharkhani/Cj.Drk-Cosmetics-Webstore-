
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import Link from 'next/link';
import { useToast } from '../../../hooks/use-toast';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, deleteDoc, doc, DocumentData } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface Product extends DocumentData {
  id: string;
  name:string;
  images: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  price: number;
  reviewCount: number;
}

function AdminProductsTable() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const productsRef = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
  const { data: products, isLoading } = useCollection<Product>(productsRef);

  const handleDelete = (productId: string, productName: string) => {
    if (confirm(`Are you sure you want to delete "${productName}"? This cannot be undone.`)) {
      const docRef = doc(firestore, 'products', productId);
      deleteDoc(docRef).then(() => {
        toast({
          title: 'Product Deleted',
          description: `"${productName}" has been successfully deleted.`,
        });
      }).catch((error: Error) => {
         toast({
          title: 'Error Deleting Product',
          description: error.message,
          variant: 'destructive',
        });
      })
    }
  };

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="hidden md:table-cell">Reviews</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell className="hidden sm:table-cell"><Skeleton className="h-16 w-16 rounded-md" /></TableCell>
              <TableCell><Skeleton className="h-6 w-48" /></TableCell>
              <TableCell><Skeleton className="h-6 w-24" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-12" /></TableCell>
              <TableCell><Skeleton className="h-8 w-8" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="hidden md:table-cell">Reviews</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map(product => (
            <TableRow key={product.id}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt={product.name}
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={product.images?.[0] || 'https://placehold.co/64x64'}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge variant={product.stockStatus === 'In Stock' ? 'default' : 'destructive'}>
                  {product.stockStatus}
                </Badge>
              </TableCell>
              <TableCell>Rs {product.price}</TableCell>
              <TableCell className="hidden md:table-cell">{product.reviewCount}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(product.id, product.name)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CardFooter className="pt-6">
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{products?.length || 0}</strong> of <strong>{products?.length || 0}</strong> products
        </div>
      </CardFooter>
    </>
  )
}


export default function AdminProductsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>Manage your products and view their sales performance.</CardDescription>
            </div>
            <Link href="/admin/add-product">
                <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Product
                </Button>
            </Link>
        </div>
      </CardHeader>
      <CardContent>
        {isClient ? <AdminProductsTable /> : (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
        )}
      </CardContent>
    </Card>
  );
}
