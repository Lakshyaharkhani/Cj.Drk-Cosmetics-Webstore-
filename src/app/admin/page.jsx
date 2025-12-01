'use client';
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { getAnalyticsData } from '@/lib/data';

export default function AdminDashboardPage() {
    const analyticsData = getAnalyticsData();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center p-8 w-full">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 w-full">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rs {analyticsData.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{analyticsData.revenueChange}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{analyticsData.subscriptions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{analyticsData.subscriptionsChange}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{analyticsData.sales.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{analyticsData.salesChange}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{analyticsData.activeNow}</div>
                <p className="text-xs text-muted-foreground">
                  {analyticsData.activeNowChange} since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 w-full mt-8">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>
                    Recent transactions from your store.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="#">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden xl:table-column">
                        Type
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Status
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analyticsData.recentTransactions.map((t,i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="font-medium">{t.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {t.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Sale
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2023-06-23
                      </TableCell>
                      <TableCell className="text-right">Rs {t.amount.toFixed(2)}</TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                {analyticsData.recentSales.map((s,i) => (
                <div className="flex items-center gap-4" key={i}>
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>{s.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {s.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {s.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+Rs {s.amount.toFixed(2)}</div>
                </div>
                ))}
              </CardContent>
            </Card>
          </div>
            <div className="w-full mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Sales Overview</CardTitle>
                        <CardDescription>An overview of sales for the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={analyticsData.salesByMonth}>
                                <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                />
                                <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `Rs ${value / 1000}K`}
                                />
                                <Bar
                                dataKey="total"
                                fill="currentColor"
                                radius={[4, 4, 0, 0]}
                                className="fill-primary"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </>
  );
}
