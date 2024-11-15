import React from 'react';
import { Package, TrendingUp, Users, DollarSign } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import InventoryTable from '../components/InventoryTable';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Products',
      value: '2,420',
      change: '+12.5%',
      isPositive: true,
      icon: Package,
      iconColor: 'bg-blue-500',
    },
    {
      title: 'Total Sales',
      value: '$45,620',
      change: '+8.2%',
      isPositive: true,
      icon: TrendingUp,
      iconColor: 'bg-green-500',
    },
    {
      title: 'Active Users',
      value: '1,210',
      change: '+18.7%',
      isPositive: true,
      icon: Users,
      iconColor: 'bg-purple-500',
    },
    {
      title: 'Revenue',
      value: '$95,420',
      change: '-4.5%',
      isPositive: false,
      icon: DollarSign,
      iconColor: 'bg-orange-500',
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Inventory Management</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Product
          </button>
        </div>
        <InventoryTable />
      </div>
    </>
  );
};

export default Dashboard;