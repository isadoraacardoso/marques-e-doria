
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface CarouselImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

export const ImageCarousel = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  const fetchCarouselImages = async () => {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('Error fetching carousel images:', error);
        return;
      }

      setImages(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [images.length]);

  if (loading) {
    return (
      <div className="w-full h-auto rounded-lg bg-[#dedcd7] animate-pulse flex items-center justify-center min-h-[400px]">
        <span className="text-[#605f60] text-lg">Carregando...</span>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-auto rounded-lg bg-[#dedcd7] flex items-center justify-center min-h-[400px]">
        <span className="text-[#605f60] text-lg">Nenhuma imagem disponível</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-2xl">
      <div className="relative">
        <img
          src={images[currentIndex].image_url}
          alt={images[currentIndex].alt_text || "Imagem do carrossel"}
          className="w-full h-auto object-cover"
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
              onClick={prevSlide}
            >
              <ChevronLeft size={24} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
              onClick={nextSlide}
            >
              <ChevronRight size={24} />
            </Button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
