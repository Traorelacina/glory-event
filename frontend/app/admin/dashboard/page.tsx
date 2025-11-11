'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { DashboardStats, Commande, Contact } from '@/types';
import StatsCards from '../../components/admin/StatsCards';
import RecentOrders from '../../components/admin/RecentOrders';
import RecentContacts from '../../components/admin/RecentContacts';
import styles from './page.module.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Commande[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [statsData, ordersData, contactsData] = await Promise.all([
          apiClient.getDashboardStats(),
          apiClient.getRecentOrders(),
          apiClient.getRecentContacts()
        ]);

        setStats(statsData);
        setRecentOrders(ordersData);
        setRecentContacts(contactsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner} role="status" aria-label="Chargement">
          <span className={styles.srOnly}>Chargement...</span>
        </div>
        <div className={styles.loadingText}>Chargement du tableau de bord...</div>
      </div>
    );
  }

  return (
    <div className={`${styles.dashboard} ${styles.fadeIn}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tableau de Bord</h1>
        <time className={styles.date} dateTime={new Date().toISOString()}>
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
      </header>

      {error && (
        <div className={styles.error} role="alert">
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      {stats && (
        <section className={styles.statsSection} aria-label="Statistiques">
          <StatsCards stats={stats} />
        </section>
      )}
      
      <div className={styles.grid}>
        <section aria-label="Commandes récentes">
          <RecentOrders orders={recentOrders} />
        </section>
        
        <section aria-label="Contacts récents">
          <RecentContacts contacts={recentContacts} />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;