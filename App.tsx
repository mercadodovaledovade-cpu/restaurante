import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Home from './components/Home.tsx';
import RecipeGenerator from './components/RecipeGenerator.tsx';
import ChefChat from './components/ChefChat.tsx';
import Footer from './components/Footer.tsx';
import { PageView } from './types.ts';

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