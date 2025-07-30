import { getPolicyBySlug, getPolicies } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateStaticParams() {
    const policies = getPolicies();
    return policies.map(policy => ({
        slug: policy.slug
    }));
}

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const policy = getPolicyBySlug(params.slug);

  if (!policy) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-4xl">{policy.title}</CardTitle>
                <p className="text-sm text-muted-foreground">Last updated: {policy.lastUpdated}</p>
            </CardHeader>
            <CardContent>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: policy.content }} />
            </CardContent>
        </Card>
    </div>
  );
}
