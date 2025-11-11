import { NavLink } from '../types';

// Informations de l'entreprise
export const COMPANY_INFO = {
  name: 'Glory Event',
  tagline: 'L\'Excellence à Chaque Événement',
  email: 'contact@gloryevent.com',
  phone: '+225 07 XX XX XX XX',
  address: 'Abidjan, Côte d\'Ivoire',
  socialMedia: {
    facebook: 'https://facebook.com/gloryevent',
    instagram: 'https://instagram.com/gloryevent',
    linkedin: 'https://linkedin.com/company/gloryevent',
    whatsapp: '+225XXXXXXXXX',
  },
};

// Navigation principale
export const NAVIGATION_LINKS: NavLink[] = [
  {
    label: 'Accueil',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
    subLinks: [
      { label: 'Événementiel', href: '/services/evenementiel' },
      { label: 'Organisation de Mariage', href: '/services/evenementiel-mariage' },
      { label: 'Réunion Professionnelle', href: '/services/relations-professionnelle' },
      { label: 'Décoration', href: '/services/decoration' },
      { label: 'Restauration', href: '/services/restauration' },
    ],
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
  },
  {
    label: 'Boutique',
    href: '/boutique',
  },
  {
    label: 'À Propos',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

// Types de services
export const SERVICES = [
  {
    id: 'evenementiel',
    title: 'Événementiel',
    slug: 'evenementiel',
    shortDescription: 'Organisation complète de tous types d\'événements',
    description: 'Nous orchestrons vos événements avec professionnalisme et créativité',
    icon: '🎊',
    image: '/images/services/evenementiel.jpg',
  },
  {
    id: 'mariage',
    title: 'Organisation de Mariage',
    slug: 'evenementiel-mariage',
    shortDescription: 'Le jour le plus important de votre vie',
    description: 'Transformez votre rêve de mariage en réalité',
    icon: '💒',
    image: '/images/services/mariage.jpg',
  },
  {
    id: 'wedding-planning',
    title: 'Wedding Planning',
    slug: 'wedding-planning',
    shortDescription: 'Planification sur-mesure de A à Z',
    description: 'Un accompagnement personnalisé pour votre mariage',
    icon: '💍',
    image: '/images/services/wedding-planning.jpg',
  },
  {
    id: 'reunion-pro',
    title: 'Réunion Professionnelle',
    slug: 'reunion-professionnelle',
    shortDescription: 'Événements corporate d\'excellence',
    description: 'Séminaires, conférences, team building',
    icon: '🏢',
    image: '/images/services/reunion-pro.jpg',
  },
  {
    id: 'decoration',
    title: 'Décoration',
    slug: 'decoration',
    shortDescription: 'Ambiances uniques et raffinées',
    description: 'Créons ensemble un décor à votre image',
    icon: '🎨',
    image: '/images/services/decoration.jpg',
  },
  {
    id: 'restauration',
    title: 'Restauration',
    slug: 'restauration',
    shortDescription: 'Gastronomie africaine, européenne et américaine',
    description: 'Des menus savoureux adaptés à vos goûts',
    icon: '🍽️',
    image: '/images/services/restauration.jpg',
  },
];

// Catégories de portfolio
export const PORTFOLIO_CATEGORIES = [
  { value: 'all', label: 'Tous' },
  { value: 'mariage', label: 'Mariages' },
  { value: 'reunion', label: 'Réunions' },
  { value: 'professionnel', label: 'Événements Professionnels' },
  { value: 'autre', label: 'Autres' },
];

// Statuts de commande
export const ORDER_STATUS = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

// Statuts de devis
export const QUOTE_STATUS = {
  pending: 'En attente',
  processing: 'En traitement',
  quoted: 'Devis envoyé',
  closed: 'Clôturé',
};

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Regex patterns
export const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
};

// Messages
export const MESSAGES = {
  success: {
    orderPlaced: 'Votre commande a été envoyée avec succès !',
    quoteSent: 'Votre demande de devis a été envoyée avec succès !',
    contactSent: 'Votre message a été envoyé avec succès !',
    newsletterSubscribed: 'Merci pour votre inscription !',
  },
  error: {
    generic: 'Une erreur est survenue. Veuillez réessayer.',
    required: 'Ce champ est obligatoire',
    invalidEmail: 'Adresse email invalide',
    invalidPhone: 'Numéro de téléphone invalide',
    emptyCart: 'Votre panier est vide',
  },
};