
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useNewsArticles } from "@/hooks/useNewsArticles";

const Noticias = () => {
  const { articles, loading } = useNewsArticles();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#b96d00] mx-auto mb-4"></div>
          <p className="text-[#605f60]">Carregando notícias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#dedcd7] via-[#d2cdc6] to-[#dedcd7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#605f60] mb-6">
            Notícias e Artigos
          </h1>
          <div className="w-24 h-1 bg-[#b96d00] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Mantenha-se atualizado com as últimas novidades do mundo jurídico, 
            análises de legislação e insights de nossa equipe.
          </p>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">
                Nenhuma notícia publicada ainda.
              </p>
              <p className="text-gray-500">
                Em breve teremos conteúdos atualizados sobre o mundo jurídico.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((noticia) => (
                <Card key={noticia.id} className="hover:shadow-xl transition-shadow duration-300 group">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-[#dedcd7] rounded-t-lg flex items-center justify-center overflow-hidden">
                      {noticia.image_url ? (
                        <img 
                          src={noticia.image_url} 
                          alt={noticia.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[#605f60] text-sm">Imagem da notícia</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={getCategoryColor(noticia.category)}>
                          {noticia.category}
                        </Badge>
                        <div className="flex items-center text-gray-500 text-sm">
                          <CalendarDays size={16} className="mr-1" />
                          {formatDate(noticia.published_at)}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#605f60] group-hover:text-[#b96d00] transition-colors">
                        {noticia.title}
                      </h3>
                      
                      {noticia.summary && (
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {noticia.summary}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-600">
                          Por {noticia.author}
                        </span>
                        <Link 
                          to={`/noticias/${noticia.id}`}
                          className="flex items-center text-[#b96d00] hover:text-[#b06f09] font-medium text-sm transition-colors"
                        >
                          Ler mais
                          <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Noticias;
