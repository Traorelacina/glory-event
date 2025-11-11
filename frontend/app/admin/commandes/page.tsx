'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Commande } from '@/types';

const CommandesPage = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const data = await apiClient.getCommandes();
        setCommandes(data);
      } catch (error) {
        console.error('Error fetching commandes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommandes();
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await apiClient.updateCommandeStatus(id, newStatus);
      setCommandes(prev =>
        prev.map(cmd =>
          cmd.id === id ? { ...cmd, status: newStatus as any } : cmd
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Gestion des Commandes</h1>
      
      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {commandes.map((commande) => (
                <tr key={commande.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {commande.client_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{commande.client_email}</div>
                    <div className="text-sm text-gray-500">{commande.client_phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {commande.total} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        commande.status === 'confirmee'
                          ? 'bg-green-100 text-green-800'
                          : commande.status === 'annulee'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {commande.status === 'confirmee'
                        ? 'Confirmée'
                        : commande.status === 'annulee'
                        ? 'Annulée'
                        : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(commande.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      value={commande.status}
                      onChange={(e) => updateStatus(commande.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-2 py-1"
                    >
                      <option value="en_attente">En attente</option>
                      <option value="confirmee">Confirmée</option>
                      <option value="annulee">Annulée</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommandesPage;