
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button onClick={() => handleNavigation("/")} className="flex items-center">
            <img 
              src="/uploads/16039e76-a2ca-4ca2-a871-3e4a3bedaee4.png" 
              alt="Marques & Doria"
              className="h-12 w-auto"
            />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation("/")}
              className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation("/quem-somos")}
              className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium"
            >
              Quem Somos
            </button>
            <button 
              onClick={() => handleNavigation("/areas-atuacao")}
              className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium"
            >
              Áreas de Atuação
            </button>
            <button 
              onClick={() => handleNavigation("/noticias")}
              className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium"
            >
              Notícias
            </button>
            <button 
              onClick={() => handleNavigation("/contato")}
              className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium"
            >
              Contato
            </button>
            <button 
              onClick={() => handleNavigation("/politica-privacidade")}
              className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium"
            >
              Política de Privacidade
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-[#b96d00] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation("/")}
                className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium text-left"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation("/quem-somos")}
                className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium text-left"
              >
                Quem Somos
              </button>
              <button 
                onClick={() => handleNavigation("/areas-atuacao")}
                className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium text-left"
              >
                Áreas de Atuação
              </button>
              <button 
                onClick={() => handleNavigation("/noticias")}
                className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium text-left"
              >
                Notícias
              </button>
              <button 
                onClick={() => handleNavigation("/contato")}
                className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium text-left"
              >
                Contato
              </button>
              <button 
                onClick={() => handleNavigation("/politica-privacidade")}
                className="text-gray-700 hover:text-[#b96d00] transition-colors font-medium text-left"
              >
                Política de Privacidade
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
