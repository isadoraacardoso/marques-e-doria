
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#605f60] mb-6">
            Entre em Contato
          </h2>
          <div className="w-24 h-1 bg-[#b96d00] mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-[#b96d00] text-white rounded-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#605f60] mb-2">Endereço</h3>
                  <p className="text-gray-700">
                    Rua Doutor Francisco Salles, nº 747, sala 11<br />
                    Centro, Lavras-MG, CEP 37200-068
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-[#b96d00] text-white rounded-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#605f60] mb-2">Telefone</h3>
                  <p className="text-gray-700">
                    (35) 99823-9302<br />
                    Emergências Jurídicas 24h: (35) 99881-8700
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-[#b96d00] text-white rounded-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#605f60] mb-2">E-mail</h3>
                  <p className="text-gray-700">renanmarquesadvocacia@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-[#b96d00] text-white rounded-lg">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#605f60] mb-2">Horário de Atendimento</h3>
                  <p className="text-gray-700">Segunda a sexta, das 9h às 17h</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#dedcd7] p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-[#605f60] mb-6">Envie uma Mensagem</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Nome completo" className="bg-white" />
                <Input placeholder="E-mail" type="email" className="bg-white" />
              </div>
              <Input placeholder="Telefone" className="bg-white" />
              <Input placeholder="Assunto" className="bg-white" />
              <Textarea 
                placeholder="Sua mensagem" 
                rows={5} 
                className="bg-white resize-none"
              />
              <Button 
                type="submit" 
                className="w-full bg-[#b96d00] hover:bg-[#b06f09] text-white py-3"
              >
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
