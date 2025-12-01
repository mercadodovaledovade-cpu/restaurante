import React from 'react';
import { PageView } from '../types.ts';
import { ArrowRight, Sparkles, Clock, Leaf } from 'lucide-react';

interface HomeProps {
  onChangeView: (view: PageView) => void;
}

const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-chef-600 to-red-600 text-white shadow-2xl mx-4 mt-8">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 px-8 py-16 md:py-24 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Descubra o sabor da <br/>
            <span className="text-yellow-300">Inteligência Artificial</span>
          </h1>
          <p className="text-lg md:text-xl text-orange-50 mb-10 max-w-2xl mx-auto font-light">
            Transforme ingredientes que você tem em casa em pratos extraordinários ou tire suas dúvidas culinárias com nosso Chef IA.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onChangeView(PageView.RECIPES)}
              className="px-8 py-4 bg-white text-chef-600 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Criar Receita Mágica
            </button>
            <button 
              onClick={() => onChangeView(PageView.CHAT)}
              className="px-8 py-4 bg-chef-800 bg-opacity-40 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-opacity-60 transition-all flex items-center justify-center gap-2"
            >
              Falar com o Chef
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Por que usar o SaborIA?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Sparkles className="text-yellow-500" size={32} />}
            title="Criatividade Infinita"
            description="Nunca mais fique sem ideias. Nossa IA gera combinações únicas baseadas no que você gosta."
          />
          <FeatureCard 
            icon={<Clock className="text-chef-500" size={32} />}
            title="Economia de Tempo"
            description="Receitas otimizadas para o seu tempo disponível. Jantares rápidos ou banquetes de domingo."
          />
          <FeatureCard 
            icon={<Leaf className="text-green-500" size={32} />}
            title="Zero Desperdício"
            description="Diga o que tem na geladeira e nós encontramos a receita perfeita para usar tudo."
          />
        </div>
      </div>
      
      {/* Example Gallery */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
           <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Inspire-se</h2>
           <p className="text-center text-gray-500 mb-12">Pratos gerados recentemente por nossos usuários</p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <img src="https://picsum.photos/400/400?random=1" alt="Food 1" className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-500 object-cover w-full h-48 md:h-64" />
             <img src="https://picsum.photos/400/400?random=2" alt="Food 2" className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-500 object-cover w-full h-48 md:h-64 mt-8 md:mt-0" />
             <img src="https://picsum.photos/400/400?random=3" alt="Food 3" className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-500 object-cover w-full h-48 md:h-64" />
             <img src="https://picsum.photos/400/400?random=4" alt="Food 4" className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-500 object-cover w-full h-48 md:h-64 mt-8 md:mt-0" />
           </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-50 hover:shadow-xl transition-shadow text-center">
    <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </div>
);

export default Home;