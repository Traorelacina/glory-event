'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './ProduitDetail.module.css';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  image: string;
  in_stock: boolean;
  featured: boolean;
}

export default function ProduitDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
    message: ''
  });
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchProduct(params.slug as string);
    }
  }, [params.slug]);

  const fetchProduct = async (slug: string) => {
    try {
      const response = await fetch(`/api/produits/${slug}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du produit:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      const response = await fetch('/api/commandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...orderForm,
          productId: product.id,
          productName: product.name
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Votre commande a été enregistrée ! Nous vous contacterons bientôt.');
        setShowOrderModal(false);
        setOrderForm({
          name: '',
          email: '',
          phone: '',
          quantity: 1,
          message: ''
        });
      } else {
        alert('Erreur lors de l\'envoi de la commande. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi de la commande.');
    }
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorContainer}>
          <h2>Produit non trouvé</h2>
          <Link href="/boutique" className={styles.backButton}>
            <ArrowLeft size={20} />
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Navigation */}
      <section className={styles.navigationSection}>
        <div className={styles.containerCustom}>
          <Link href="/boutique" className={styles.backLink}>
            <ArrowLeft size={20} />
            Retour à la boutique
          </Link>
        </div>
      </section>

      {/* Product Detail */}
      <section className={styles.productSection}>
        <div className={styles.containerCustom}>
          <div className={styles.productDetail}>
            {/* Product Image */}
            <div className={styles.productImageContainer}>
              <img 
                src={`/images/products/${product.image}`} 
                alt={product.name}
                className={styles.productImage}
              />
              {!product.in_stock && (
                <div className={styles.outOfStockBadge}>
                  Épuisé
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className={styles.productInfo}>
              <div className={styles.productHeader}>
                <span className={styles.productCategory}>
                  {product.category}
                </span>
              </div>

              <h1 className={styles.productTitle}>
                {product.name}
              </h1>

              <p className={styles.productDescription}>
                {product.description}
              </p>

              <div className={styles.productPrice}>
                <span className={styles.priceValue}>
                  {product.price.toLocaleString('fr-FR')}
                </span>
                <span className={styles.priceCurrency}>FCFA</span>
              </div>

              <button
                onClick={() => setShowOrderModal(true)}
                disabled={!product.in_stock}
                className={`${styles.orderButton} ${
                  !product.in_stock ? styles.orderButtonDisabled : ''
                }`}
              >
                <ShoppingBag size={20} />
                <span>Commander ce produit</span>
              </button>

              {/* Product Features */}
              <div className={styles.featuresSection}>
                <h3 className={styles.featuresTitle}>Caractéristiques</h3>
                <div className={styles.featuresGrid}>
                  <div className={styles.featureItem}>
                    <span className={styles.featureLabel}>Catégorie:</span>
                    <span className={styles.featureValue}>{product.category}</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureLabel}>Disponibilité:</span>
                    <span className={styles.featureValue}>
                      {product.in_stock ? 'En stock' : 'Épuisé'}
                    </span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureLabel}>Livraison:</span>
                    <span className={styles.featureValue}>48-72h à Abidjan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {showOrderModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  Commander: {product.name}
                </h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className={styles.modalClose}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleOrderSubmit} className={styles.orderForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Quantité *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={orderForm.quantity}
                    onChange={(e) => setOrderForm({...orderForm, quantity: parseInt(e.target.value)})}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Message / Adresse de livraison
                  </label>
                  <textarea
                    rows={4}
                    value={orderForm.message}
                    onChange={(e) => setOrderForm({...orderForm, message: e.target.value})}
                    placeholder="Indiquez votre adresse de livraison et toute information utile..."
                    className={styles.formTextarea}
                  ></textarea>
                </div>

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    onClick={() => setShowOrderModal(false)}
                    className={styles.cancelButton}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                  >
                    Envoyer la commande
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}