
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Users, Briefcase, Shield, Heart, FileText, Building, Gavel } from "lucide-react";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";

const AreasAtuacao = () => {
  const { practiceAreas, loading } = usePracticeAreas();

  // Map of icon names to actual icon components
  const iconMap: Record<string, any> = {
    Scale,
    Users,
    Briefcase,
    Shield,
    Heart,
    FileText,
    Building,
    Gavel,
  };

  // Default areas to show if no data is available
  const defaultAreas = [
    {
      icon: Scale,
      title: "Direito Civil",
      description: "Assessoria e representação em questões contratuais, responsabilidade civil, obrigações e direitos patrimoniais."
    },
    {
      icon: Heart,
      title: "Direito de Famílias e Sucessões",
      description: "Atuação em processos de divórcio, guarda, alimentos, inventários e planejamento sucessório, sempre com sensibilidade e respeito às particularidades familiares."
    },
    {
      icon: Users,
      title: "Direito do Trabalho",
      description: "Defesa dos interesses de empregados e empregadores, em ações trabalhistas e consultoria preventiva."
    },
    {
      icon: Briefcase,
      title: "Direito Empresarial",
      description: "Orientação jurídica a empresas, com foco na segurança legal das operações e na prevenção de litígios."
    },
    {
      icon: Shield,
      title: "Direito Criminal",
      description: "Atuação na defesa e no acompanhamento processual em casos criminais, sempre assegurando os direitos e garantias fundamentais."
    }
  ];

  // Use database data if available, otherwise use default areas
  const areas = practiceAreas.length > 0 ? practiceAreas.map(area => ({
    icon: iconMap[area.icon_name || 'Scale'] || Scale,
    title: area.title,
    description: area.description
  })) : defaultAreas;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#b96d00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando áreas de atuação...</p>
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
            Áreas de Atuação
          </h1>
          <div className="w-24 h-1 bg-[#b96d00] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Atuamos com excelência em diversas áreas do Direito, sempre com foco 
            na orientação preventiva e na solução responsável dos conflitos.
          </p>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {areas.map((area, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#b96d00]">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-[#b96d00] text-white rounded-lg mr-4">
                      <area.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#605f60]">
                      {area.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AreasAtuacao;
