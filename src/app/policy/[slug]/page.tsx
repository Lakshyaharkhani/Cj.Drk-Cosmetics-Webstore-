
'use client'

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, DocumentData, Timestamp } from 'firebase/firestore';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

interface Policy extends DocumentData {
    title: string;
    lastUpdated: Timestamp | string;
    content: string;
}

export default function PolicyPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const firestore = useFirestore();
  
  const policyRef = useMemoFirebase(() => slug ? doc(firestore, 'policies', slug) : null, [firestore, slug]);
  const { data: policy, isLoading } = useDoc<Policy>(policyRef);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12">Loading...</div>;
  }

  if (!policy) {
    notFound();
  }
  
  const lastUpdatedDate = policy.lastUpdated instanceof Timestamp
    ? policy.lastUpdated.toDate().toLocaleDateString()
    : policy.lastUpdated;


  return (
    <div className="container mx-auto px-4 py-12">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-4xl">{policy.title}</CardTitle>
                <p className="text-sm text-muted-foreground">Last updated: {lastUpdatedDate}</p>
            </CardHeader>
            <CardContent>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: policy.content }} />
            </CardContent>
        </Card>
    </div>
  );
}

    