
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import Link from 'next/link';
import { getProducts } from '../../../lib/data';
import { useToast } from '../../../hooks/use-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(getProducts());
  const { toast } = useToast();
  const isLoading = false;

  const handleDelete = (productId, productName) => {
    if (confirm(`Are you sure you want to delete "${productName}"? This cannot be undone.`)) {
      // In a real app, you would make an API call to delete the product
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      toast({
        title: 'Product Deleted',
        description: `"${productName}" has been successfully deleted.`,
      });
    }
  };

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
            {isLoading && (
              <TableRow>
                <TableCell colSpan="6" className="text-center">Loading products...</TableCell>
              </TableRow>
            )}
            {products?.map(product => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={product.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.images[0]}
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
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{products?.length || 0}</strong> of <strong>{products?.length || 0}</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
