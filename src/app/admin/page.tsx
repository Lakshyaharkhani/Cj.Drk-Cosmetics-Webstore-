
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

export default function AdminDashboardPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center p-8 w-full">
          <h3 className="text-2xl font-bold tracking-tight">
            Welcome to your Dashboard
          </h3>
          <p className="text-muted-foreground">
            Manage your products, orders, and view analytics here.
          </p>
        </div>
      </div>
    </>
  );
}

    