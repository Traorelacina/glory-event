import "./globals.css";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import { AuthProvider } from "./contexts/AuthContext";

export const metadata = {
  title: "Glory Event - Organisation d'événements",
  description: "Votre partenaire pour des événements exceptionnels et des parfums d'exception",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
