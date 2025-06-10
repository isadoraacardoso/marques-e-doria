import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ImageCarousel } from "./ImageCarousel";
export const Hero = () => {
  return <section className="relative bg-gradient-to-br from-[#dedcd7] via-[#d2cdc6] to-[#dedcd7] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Image first on mobile, second on desktop */}
          <div className="relative order-1 lg:order-2">
            <div className="w-full h-64 sm:h-80 lg:h-96">
              <ImageCarousel />
            </div>
          </div>
          
          {/* Text second on mobile, first on desktop */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#605f60] leading-tight">
                Marques & Doria
              </h1>
              <h2 className="text-xl md:text-2xl text-[#605f60] font-medium">
                Sociedade de Advogados
              </h2>
            </div>
            
            <p className="text-lg text-[#605f60] leading-relaxed max-w-2xl">Comprometidos com a ética, a excelência e a defesa dos direitos. </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-[#b96d00] hover:bg-[#b06f09] text-white px-8 py-3 text-lg">
                <Link to="/quem-somos">Conheça Nossa Equipe</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#b96d00] text-[#b96d00] hover:bg-[#b96d00] hover:text-white px-8 py-3 text-lg">
                <Link to="/areas-atuacao">Áreas de Atuação</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};