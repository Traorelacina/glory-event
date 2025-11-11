'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import './sidebar.module.css';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: '📊',
      role: ['admin', 'editor']
    },
    {
      name: 'Commandes',
      href: '/admin/commandes',
      icon: '📦',
      role: ['admin', 'editor']
    },
    {
      name: 'Produits',
      href: '/admin/produits',
      icon: '🛍️',
      role: ['admin', 'editor']
    },
    {
      name: 'Portfolio',
      href: '/admin/portfolio',
      icon: '📷',
      role: ['admin', 'editor']
    },
    {
      name: 'Services',
      href: '/admin/services',
      icon: '⚡',
      role: ['admin', 'editor']
    },
    {
      name: 'Contacts',
      href: '/admin/contacts',
      icon: '📞',
      role: ['admin']
    },
    {
      name: 'Paramètres',
      href: '/admin/parametres',
      icon: '⚙️',
      role: ['admin']
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.role.includes(user?.role || '')
  );

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="admin-sidebar">
      {/* Header Sidebar */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <span className="logo-icon">🎉</span>
          </div>
          <div className="brand-info">
            <h1 className="brand-title">Glory Event</h1>
            <p className="brand-subtitle capitalize">
              {user?.role || 'Utilisateur'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {filteredMenuItems.map((item) => (
            <li key={item.name} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'nav-link-active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Sidebar */}
      <div className="sidebar-footer">
        <div className="footer-content">
          <p className="footer-text">Version 1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;