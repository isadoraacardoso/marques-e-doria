
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamMemberPhoto } from "@/hooks/useTeamMemberPhotos";

interface TeamMemberPhotoCarouselProps {
  photos: TeamMemberPhoto[];
  memberName: string;
}

export const TeamMemberPhotoCarousel = ({ photos, memberName }: TeamMemberPhotoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="aspect-square bg-[#dedcd7] flex items-center justify-center">
        <span className="text-[#605f60] text-lg">Foto do profissional</span>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative aspect-square bg-[#dedcd7] overflow-hidden">
      <img 
        src={photos[currentIndex].photo_url} 
        alt={photos[currentIndex].alt_text || memberName}
        className="w-full h-full object-cover"
      />
      
      {photos.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white h-8 w-8"
            onClick={prevSlide}
          >
            <ChevronLeft size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white h-8 w-8"
            onClick={nextSlide}
          >
            <ChevronRight size={16} />
          </Button>
          
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {photos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
