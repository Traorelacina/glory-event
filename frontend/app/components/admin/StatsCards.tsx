import React from 'react';
import { DashboardStats } from '@/types';

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Commandes',
      value: stats.total_commandes,
      color: 'bg-blue-500',
      icon: '📦',
    },
    {
      title: 'Commandes en Attente',
      value: stats.commandes_en_attente,
      color: 'bg-yellow-500',
      icon: '⏳',
    },
    {
      title: 'Total Produits',
      value: stats.total_produits,
      color: 'bg-green-500',
      icon: '🛍️',
    },
    {
      title: 'Total Contacts',
      value: stats.total_contacts,
      color: 'bg-purple-500',
      icon: '📞',
    },
    {
      title: 'Services',
      value: stats.total_services,
      color: 'bg-indigo-500',
      icon: '⚡',
    },
    {
      title: 'Portfolio',
      value: stats.total_portfolio,
      color: 'bg-pink-500',
      icon: '📷',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-blue-500"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">{card.icon}</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;