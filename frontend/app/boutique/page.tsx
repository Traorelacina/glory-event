'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Filter } from 'lucide-react';
import Link from 'next/link';
import styles from './Boutique.module.css';

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

export default function BoutiquePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderForm, setOrderForm] = useState({
    productId: '',
    productName: '',
    name: '',
    email: '',
    phone: '',
    quantity: 1,
    message: ''
  });
  const [showOrderModal, setShowOrderModal] = useState(false);

  const categories = ['Tous', 'Femme', 'Homme', 'Mixte'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/produits');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'Tous' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleOrderClick = (product: Product) => {
    setOrderForm({
      ...orderForm,
      productId: product.id,
      productName: product.name
    });
    setShowOrderModal(true);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/commandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderForm),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Votre commande a été enregistrée ! Nous vous contacterons bientôt.');
        setShowOrderModal(false);
        setOrderForm({
          productId: '',
          productName: '',
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
          <p>Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.containerCustom}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Notre Boutique
            </h1>
            <div className={styles.heroDivider}></div>
            <p className={styles.heroDescription}>
              Découvrez notre collection exclusive de parfums de luxe. 
              Chaque fragrance raconte une histoire unique.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.containerCustom}>
          <div className={styles.filterContainer}>
            <div className={styles.filterLabel}>
              <Filter size={20} />
              <span>Catégorie:</span>
            </div>
            <div className={styles.categoryButtons}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${styles.categoryButton} ${
                    selectedCategory === category ? styles.categoryButtonActive : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className={styles.containerCustom}>
          {filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Aucun produit trouvé dans cette catégorie.</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  {/* Product Image */}
                  <div className={styles.productImage}>
                    <img 
                      src={`/images/products/${product.image}`} 
                      alt={product.name}
                      className={styles.productImg}
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

                    <h3 className={styles.productName}>
                      {product.name}
                    </h3>

                    <p className={styles.productDescription}>
                      {product.description}
                    </p>

                    <div className={styles.productFooter}>
                      <div className={styles.productPrice}>
                        <span className={styles.priceValue}>
                          {product.price.toLocaleString('fr-FR')}
                        </span>
                        <span className={styles.priceCurrency}>FCFA</span>
                      </div>
                      <button
                        onClick={() => handleOrderClick(product)}
                        disabled={!product.in_stock}
                        className={`${styles.orderButton} ${
                          !product.in_stock ? styles.orderButtonDisabled : ''
                        }`}
                      >
                        <ShoppingBag size={18} />
                        <span>Commander</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.containerCustom}>
          <div className={styles.infoContainer}>
            <h2 className={styles.infoTitle}>
              Informations de Commande
            </h2>
            <div className={styles.infoContent}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <h3 className={styles.infoItemTitle}>📦 Livraison</h3>
                  <p>Livraison disponible à Abidjan sous 48-72h. Frais de livraison selon la zone.</p>
                </div>
                <div className={styles.infoItem}>
                  <h3 className={styles.infoItemTitle}>💳 Paiement</h3>
                  <p>Paiement à la livraison ou par transfert mobile money (Orange Money, MTN Money, Moov Money).</p>
                </div>
                <div className={styles.infoItem}>
                  <h3 className={styles.infoItemTitle}>🎁 Authenticité</h3>
                  <p>Tous nos parfums sont 100% authentiques et originaux.</p>
                </div>
                <div className={styles.infoItem}>
                  <h3 className={styles.infoItemTitle}>📞 Support</h3>
                  <p>Notre équipe est disponible pour répondre à toutes vos questions.</p>
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
                  Commander: {orderForm.productName}
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