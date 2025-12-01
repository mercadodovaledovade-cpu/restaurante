import React, { useState } from 'react';
import { generateRecipeFromIngredients } from '../services/geminiService';
import { Recipe } from '../types';
import { ChefHat, Timer, Flame, BarChart, Loader2, Share2, Printer } from 'lucide-react';

const RecipeGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const result = await generateRecipeFromIngredients(input);
      setRecipe(result);
    } catch (err) {
      setError("Não foi possível gerar a receita. Verifique sua conexão ou tente outros ingredientes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">O que você quer comer hoje?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Digite os ingredientes que você tem na geladeira (ex: "frango, batata, creme de leite") ou o nome de um prato que deseja aprender.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="relative max-w-2xl mx-auto mb-16">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-chef-400 to-yellow-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: 3 ovos, farinha, leite e chocolate..."
            className="relative w-full p-5 pr-36 rounded-2xl border-none shadow-xl text-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-chef-500 focus:outline-none bg-white"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 bg-chef-600 text-white px-6 rounded-xl font-medium hover:bg-chef-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <ChefHat size={20} />}
            <span className="hidden sm:inline">Criar</span>
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center mb-8 border border-red-100">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-20">
          <div className="relative inline-block w-24 h-24">
             <div className="absolute top-0 left-0 w-full h-full border-4 border-chef-100 rounded-full"></div>
             <div className="absolute top-0 left-0 w-full h-full border-4 border-chef-500 rounded-full border-t-transparent animate-spin"></div>
             <ChefHat className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-chef-500" size={32} />
          </div>
          <p className="text-gray-500 mt-4 animate-pulse">O Chef está pensando na melhor combinação...</p>
        </div>
      )}

      {recipe && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-slide-up border border-orange-50">
          <div className="bg-chef-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
              <ChefHat size={300} />
            </div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-3 backdrop-blur-sm">
                {recipe.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{recipe.title}</h1>
              <p className="text-orange-50 text-lg leading-relaxed max-w-2xl">{recipe.description}</p>
              
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Timer size={20} className="text-yellow-300" />
                  <span className="font-semibold">{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <BarChart size={20} className="text-yellow-300" />
                  <span className="font-semibold">{recipe.difficulty}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Flame size={20} className="text-yellow-300" />
                  <span className="font-semibold">{recipe.calories}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 p-8">
            <div className="md:col-span-1">
              <div className="bg-orange-50 p-6 rounded-2xl sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-chef-200 rounded-full flex items-center justify-center text-chef-800 text-sm">1</span>
                  Ingredientes
                </h3>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 pb-3 border-b border-orange-100 last:border-0">
                      <div className="w-2 h-2 mt-2 bg-chef-400 rounded-full flex-shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-chef-200 rounded-full flex items-center justify-center text-chef-800 text-sm">2</span>
                Modo de Preparo
              </h3>
              <div className="space-y-6">
                {recipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-white border-2 border-chef-100 text-chef-600 rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-chef-600 group-hover:text-white transition-colors shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none flex-grow group-hover:bg-orange-50 transition-colors">
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 flex justify-end gap-4 border-t border-gray-100 pt-8">
                <button className="flex items-center gap-2 text-gray-500 hover:text-chef-600 transition-colors">
                  <Printer size={18} />
                  <span>Imprimir</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-chef-600 transition-colors">
                  <Share2 size={18} />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;