import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { adminApi } from '../../services/api';
import { Loader, AlertCircle, Briefcase, Package, ShoppingCart, Clock, Mail, Image, TrendingUp, Activity, Sparkles, Star, ArrowRight } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

interface DashboardStats {
  total_services: number;
  total_produits: number;
  total_commandes: number;
  commandes_en_attente: number;
  total_contacts: number;
  total_portfolio: number;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await adminApi.getDashboard(token);
        setStats(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement du dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token, navigate]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [stats]);

  return (
    <AdminLayout>
      <div className="min-h-screen">
        {/* Hero Header Section */}
        <section className="relative mb-8 overflow-hidden rounded-3xl">
          {/* Background animé avec dégradé */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
            <div className="absolute inset-0 opacity-30">
              <div 
                className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl"
                style={{ animation: 'float 8s ease-in-out infinite' }}
              ></div>
              <div 
                className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600 rounded-full blur-3xl"
                style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '2s' }}
              ></div>
            </div>
          </div>

          {/* Particules flottantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Contenu du header */}
          <div className="relative z-10 p-8 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div 
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-4"
                  style={{ animation: 'slideDown 0.8s ease-out' }}
                >
                  <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Tableau de Bord Admin</span>
                </div>
                
                <h1 
                  className="text-4xl md:text-5xl font-bold mb-3 flex items-center gap-3"
                  style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}
                >
                  <Activity className="animate-pulse" size={40} />
                  Dashboard
                </h1>
                <p 
                  className="text-purple-100 text-lg md:text-xl"
                  style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}
                >
                  Vue d'ensemble de votre plateforme événementielle
                </p>
              </div>
              
              <div 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}
              >
                <p className="text-sm text-purple-200 mb-1 font-medium">Dernière mise à jour</p>
                <p className="text-2xl font-bold">{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div 
            className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-2xl shadow-xl flex gap-4"
            style={{ animation: 'slideInLeft 0.6s ease-out' }}
          >
            <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="text-red-900 font-bold text-lg mb-1">Erreur de chargement</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl border border-purple-100">
            <Loader className="animate-spin text-purple-600 mb-4" size={60} />
            <p className="text-gray-700 font-semibold text-lg">Chargement des statistiques...</p>
            <p className="text-gray-500 text-sm mt-2">Veuillez patienter</p>
          </div>
        ) : stats ? (
          <>
            {/* Main Stats Grid */}
            <div 
              id="stats-grid"
              data-animate
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              style={{
                opacity: isVisible['stats-grid'] ? 1 : 0,
                transform: isVisible['stats-grid'] ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease-out',
              }}
            >
              <StatCard 
                label="Services" 
                value={stats.total_services} 
                icon={Briefcase}
                gradient="from-purple-500 to-indigo-500"
                subtitle="Services actifs"
              />
              <StatCard 
                label="Produits" 
                value={stats.total_produits} 
                icon={Package}
                gradient="from-pink-500 to-rose-500"
                subtitle="Parfums en catalogue"
              />
              <StatCard 
                label="Commandes" 
                value={stats.total_commandes} 
                icon={ShoppingCart}
                gradient="from-blue-500 to-cyan-500"
                subtitle="Commandes totales"
              />
              <StatCard 
                label="En attente" 
                value={stats.commandes_en_attente} 
                icon={Clock}
                gradient="from-amber-500 to-orange-500"
                subtitle="À traiter"
                highlight={true}
              />
              <StatCard 
                label="Contacts" 
                value={stats.total_contacts} 
                icon={Mail}
                gradient="from-teal-500 to-emerald-500"
                subtitle="Demandes reçues"
              />
              <StatCard 
                label="Portfolio" 
                value={stats.total_portfolio} 
                icon={Image}
                gradient="from-violet-500 to-purple-500"
                subtitle="Réalisations"
              />
            </div>

            {/* Quick Actions Section */}
            <div 
              id="quick-actions"
              data-animate
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-100 relative overflow-hidden"
              style={{
                opacity: isVisible['quick-actions'] ? 1 : 0,
                transform: isVisible['quick-actions'] ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease-out 0.2s',
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Actions rapides</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <QuickActionButton 
                    label="Gérer les produits"
                    href="/admin/produits"
                    icon={Package}
                    gradient="from-purple-600 to-indigo-600"
                  />
                  <QuickActionButton 
                    label="Voir les commandes"
                    href="/admin/commandes"
                    icon={ShoppingCart}
                    gradient="from-pink-600 to-rose-600"
                  />
                  <QuickActionButton 
                    label="Consulter contacts"
                    href="/admin/contacts"
                    icon={Mail}
                    gradient="from-blue-600 to-cyan-600"
                  />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
          }
          25% { 
            transform: translateY(-20px) translateX(10px); 
          }
          50% { 
            transform: translateY(-10px) translateX(-10px); 
          }
          75% { 
            transform: translateY(-15px) translateX(5px); 
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </AdminLayout>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: any;
  gradient: string;
  subtitle?: string;
  highlight?: boolean;
}

function StatCard({ label, value, icon: Icon, gradient, subtitle, highlight }: StatCardProps) {
  return (
    <div className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-default overflow-hidden ${highlight ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}`}>
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            <Icon className="text-white" size={28} />
          </div>
          {highlight && (
            <span className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
              <Sparkles className="w-3 h-3" />
              URGENT
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm font-bold mb-2 uppercase tracking-wider">{label}</p>
        <p className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient} text-4xl font-bold mb-2`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-gray-500 text-sm">{subtitle}</p>
        )}
      </div>

      {/* Background gradient au survol */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
    </div>
  );
}

interface QuickActionButtonProps {
  label: string;
  href: string;
  icon: any;
  gradient: string;
}

function QuickActionButton({ label, href, icon: Icon, gradient }: QuickActionButtonProps) {
  return (
    <a
      href={href}
      className={`group relative flex items-center gap-3 p-5 bg-gradient-to-r ${gradient} text-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 font-semibold overflow-hidden`}
    >
      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      
      <div className="relative z-10 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
        <Icon size={20} />
      </div>
      <span className="relative z-10">{label}</span>
      <ArrowRight className="relative z-10 w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
    </a>
  );
}