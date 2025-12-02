import React, { ReactNode, useState } from 'react';
import { Sun, Menu, X, Calculator, MessageCircle, AlertTriangle, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const NavItem = ({ to, icon: Icon, label, active, onClick }: { to: string; icon: any; label: string; active: boolean; onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
      active 
        ? 'bg-solar-500 text-white shadow-md' 
        : 'text-slate-600 hover:bg-solar-100 hover:text-solar-700'
    }`}
  >
    <Icon size={18} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-solar-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-tr from-solar-400 to-solar-600 p-2 rounded-lg text-white">
                <Sun size={24} fill="currentColor" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-solar-700 to-solar-900">
                SuryaMitra
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-2">
              <NavItem to="/" icon={Home} label="Home" active={location.pathname === '/'} />
              <NavItem to="/calculator" icon={Calculator} label="Smart Estimate" active={location.pathname === '/calculator'} />
              <NavItem to="/challenges" icon={AlertTriangle} label="India Challenges" active={location.pathname === '/challenges'} />
              <NavItem to="/assistant" icon={MessageCircle} label="Ask Surya" active={location.pathname === '/assistant'} />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 rounded-md text-slate-600 hover:bg-slate-100">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2 shadow-lg animate-in slide-in-from-top-5">
            <NavItem to="/" icon={Home} label="Home" active={location.pathname === '/'} onClick={toggleMenu} />
            <NavItem to="/calculator" icon={Calculator} label="Smart Estimate" active={location.pathname === '/calculator'} onClick={toggleMenu} />
            <NavItem to="/challenges" icon={AlertTriangle} label="India Challenges" active={location.pathname === '/challenges'} onClick={toggleMenu} />
            <NavItem to="/assistant" icon={MessageCircle} label="Ask Surya" active={location.pathname === '/assistant'} onClick={toggleMenu} />
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <p>© 2025 SuryaMitra India. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default Layout;
