'use client';

import React from 'react';
import { useRequireAuth } from '../contexts/AuthContext';
import Sidebar from '../components/admin/Sidebar';
import UserMenu from '../components/admin/UserMenu';
import Loading from '../components/admin/Loading';
import './AdminLayout.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useRequireAuth();

  if (isLoading) return <Loading />;

  return (
    <div className="admin-layout-container">
      <Sidebar />
      <div className="admin-content-wrapper">
        <header className="admin-header">
          <div className="header-content">
            <div className="header-info">
              <h1 className="header-title">
                Administration Glory Event
              </h1>
              <p className="header-subtitle">
                Bienvenue, {user?.name || 'Administrateur'}
              </p>
            </div>
            <UserMenu />
          </div>
        </header>

        <main className="admin-main-content">
          <div className="content-container">{children}</div>
        </main>
      </div>
    </div>
  );
}