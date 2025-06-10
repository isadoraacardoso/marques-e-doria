
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#605f60] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <img 
              src="/uploads/16039e76-a2ca-4ca2-a871-3e4a3bedaee4.png" 
              alt="Marques & Doria"
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-gray-300">
              Comprometidos com a ética, a excelência e a defesa dos direitos.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/quem-somos" className="text-gray-300 hover:text-white transition-colors">
                Quem Somos
              </Link>
              <Link to="/areas-atuacao" className="text-gray-300 hover:text-white transition-colors">
                Áreas de Atuação
              </Link>
              <Link to="/noticias" className="text-gray-300 hover:text-white transition-colors">
                Notícias
              </Link>
              <Link to="/contato" className="text-gray-300 hover:text-white transition-colors">
                Contato
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-2 text-gray-300">
              <p>Rua Doutor Francisco Salles, nº 747, sala 11</p>
              <p>Centro, Lavras-MG, CEP 37200-068</p>
              <p>(35) 99823-9302</p>
              <p>renanmarquesadvocacia@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Marques & Doria Sociedade de Advogados. 
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
