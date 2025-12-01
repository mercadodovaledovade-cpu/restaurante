import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RecipeGenerator from './components/RecipeGenerator';
import ChefChat from './components/ChefChat';
import Footer from './components/Footer';
import { PageView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>(PageView.HOME);

  const renderView = () => {
    switch (currentView) {
      case PageView.HOME:
        return <Home onChangeView={setCurrentView} />;
      case PageView.RECIPES:
        return <RecipeGenerator />;
      case PageView.CHAT:
        return <ChefChat />;
      default:
        return <Home onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/50 flex flex-col font-sans">
      <Navbar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer />
    </div>
  );
};

export default App;