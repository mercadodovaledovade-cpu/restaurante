import React from 'react';
import { UtensilsCrossed, ChefHat, MessageSquareText, Search } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentView: PageView;
  onChangeView: (view: PageView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const navItemClass = (view: PageView) => `
    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium
    ${currentView === view 
      ? 'bg-chef-600 text-white shadow-lg shadow-chef-200 scale-105' 
      : 'text-gray-600 hover:bg-chef-100 hover:text-chef-700'}
  `;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onChangeView(PageView.HOME)}
          >
            <div className="bg-gradient-to-tr from-chef-500 to-yellow-400 p-2 rounded-xl text-white">
              <UtensilsCrossed size={24} />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-chef-600 to-yellow-600">
              SaborIA
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => onChangeView(PageView.RECIPES)} 
              className={navItemClass(PageView.RECIPES)}
            >
              <Search size={18} />
              <span className="hidden sm:inline">Criar Receita</span>
            </button>
            <button 
              onClick={() => onChangeView(PageView.CHAT)} 
              className={navItemClass(PageView.CHAT)}
            >
              <MessageSquareText size={18} />
              <span className="hidden sm:inline">Chef Chat</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;