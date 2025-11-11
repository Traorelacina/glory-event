import React from 'react';
import { Commande } from '@/types';
import Link from 'next/link';

interface RecentOrdersProps {
  orders: Commande[];
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmee':
        return 'bg-green-100 text-green-800';
      case 'annulee':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmee':
        return 'Confirmée';
      case 'annulee':
        return 'Annulée';
      default:
        return 'En attente';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Commandes Récentes</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {orders.length === 0 ? (
          <div className="px-4 py-5 sm:px-6">
            <p className="text-gray-500 text-center">Aucune commande récente</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {order.client_name}
                  </h4>
                  <p className="text-sm text-gray-500">{order.client_email}</p>
                  <p className="text-sm text-gray-500">{order.client_phone}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {order.total} €
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  {new Date(order.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
        <Link
          href="/admin/commandes"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Voir toutes les commandes →
        </Link>
      </div>
    </div>
  );
};

export default RecentOrders;