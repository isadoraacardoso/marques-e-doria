
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNewsArticles } from "@/hooks/useNewsArticles";

const NoticiaDetalhes = () => {
  const { id } = useParams();
  const { getArticleById, loading } = useNewsArticles();
  const noticia = id ? getArticleById(id) : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Direito Empresarial": "bg-blue-100 text-blue-800",
      "Direito de Família": "bg-green-100 text-green-800",
      "Direito do Trabalho": "bg-purple-100 text-purple-800",
      "Direito Civil": "bg-orange-100 text-orange-800",
      "Direito Criminal": "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const extractYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#b96d00] mx-auto mb-4"></div>
          <p className="text-[#605f60]">Carregando notícia...</p>
        </div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#605f60] mb-4">Notícia não encontrada</h1>
          <Button asChild className="bg-[#b96d00] hover:bg-[#b06f09]">
            <Link to="/noticias">Voltar para notícias</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/noticias" className="flex items-center text-[#b96d00] hover:text-[#b06f09]">
            <ArrowLeft size={20} className="mr-2" />
            Voltar para notícias
          </Link>
        </Button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge className={getCategoryColor(noticia.category)}>
              {noticia.category}
            </Badge>
            <div className="flex items-center text-gray-600">
              <CalendarDays size={16} className="mr-2" />
              {formatDate(noticia.published_at)}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#605f60] mb-4 leading-tight">
            {noticia.title}
          </h1>
          
          <div className="flex items-center text-gray-600">
            <User size={16} className="mr-2" />
            <span>Por {noticia.author}</span>
          </div>
        </header>

        {/* Featured Image */}
        {noticia.image_url && (
          <div className="mb-8">
            <img 
              src={noticia.image_url} 
              alt={noticia.title} 
              className="w-full h-64 md:h-96 object-cover rounded-lg" 
            />
          </div>
        )}

        {/* YouTube Video */}
        {noticia.youtube_url && (
          <div className="mb-8">
            {(() => {
              const videoId = extractYouTubeVideoId(noticia.youtube_url);
              if (videoId) {
                return (
                  <div className="relative w-full h-64 md:h-96">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={noticia.title}
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}

        {/* Featured Video */}
        {noticia.video_url && (
          <div className="mb-8">
            <video 
              src={noticia.video_url} 
              controls 
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            >
              Seu navegador não suporta a reprodução de vídeo.
            </video>
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 whitespace-pre-wrap">
            {noticia.content}
          </div>
        </article>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          
        </footer>
      </div>
    </div>
  );
};

export default NoticiaDetalhes;
