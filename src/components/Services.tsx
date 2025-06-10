
import { Scale, Users, Briefcase, Shield, Heart, FileText, Building, Gavel } from "lucide-react";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";

export const Services = () => {
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

  // Default services to show if no data is available
  const defaultServices = [
    {
      icon: Scale,
      title: "Direito Civil",
      description: "Assessoria e representação em questões contratuais, responsabilidade civil, obrigações e direitos patrimoniais."
    },
    {
      icon: Heart,
      title: "Direito de Famílias e Sucessões",
      description: "Atuação em processos de divórcio, guarda, alimentos, inventários e planejamento sucessório."
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
      description: "Atuação na defesa e no acompanhamento processual em casos criminais, sempre assegurando os direitos fundamentais."
    }
  ];

  // Use database data if available, otherwise use default services
  const services = practiceAreas.length > 0 ? practiceAreas.slice(0, 5).map(area => ({
    icon: iconMap[area.icon_name || 'Scale'] || Scale,
    title: area.title,
    description: area.description
  })) : defaultServices;

  if (loading) {
    return (
      <section className="py-20 bg-[#dedcd7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b96d00] mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando áreas de atuação...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#dedcd7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#605f60] mb-6">
            Áreas de Atuação
          </h2>
          <div className="w-24 h-1 bg-[#b96d00] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Atuamos com excelência em diversas áreas do Direito, sempre com foco 
            na orientação preventiva e na solução responsável dos conflitos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-[#b96d00] text-white rounded-lg mb-6 mx-auto">
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#605f60] mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
