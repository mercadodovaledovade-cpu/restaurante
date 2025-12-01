import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-orange-100 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          Desenvolvido com <span className="text-red-500">♥</span> e tecnologia Gemini
        </p>
        <p className="text-gray-400 text-xs mt-2">
          © {new Date().getFullYear()} SaborIA. As receitas geradas por IA devem ser verificadas antes do preparo.
        </p>
      </div>
    </footer>
  );
};

export default Footer;