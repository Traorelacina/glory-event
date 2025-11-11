'use client';

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './login.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@glory-event.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      // Redirection MANUELLE après connexion réussie
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-icon">🎉</span>
            <h1>Glory Event</h1>
          </div>
          <h2 className="login-title">Espace Administrateur</h2>
          <p className="login-subtitle">Connectez-vous à votre dashboard</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Adresse Email
            </label>
            <div className="input-container">
              <span className="input-icon">📧</span>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="form-input"
                placeholder="admin@glory-event.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="form-input"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? (
              <>
                <div className="button-spinner"></div>
                Connexion...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            © 2024 Glory Event. Tous droits réservés.
          </p>
          <Link href="/" className="back-to-site">
            ← Retour au site principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;