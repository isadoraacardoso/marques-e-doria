import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Mapa from "@/components/map";

const Contato = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#dedcd7] via-[#d2cdc6] to-[#dedcd7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#605f60] mb-6">
            Entre em Contato
          </h1>
          <div className="w-24 h-1 bg-[#b96d00] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Preencha o formulário abaixo ou envie uma mensagem para nossos
            canais oficiais.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#605f60] mb-8">
                  Informações de Contato
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#b96d00] text-white rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#605f60] mb-2">
                      Endereço
                    </h3>
                    <p className="text-gray-700">
                      Rua Doutor Francisco Salles, nº 747, sala 11
                      <br />
                      Centro, Lavras-MG
                      <br />
                      CEP 37200-068
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#b96d00] text-white rounded-lg">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#605f60] mb-2">
                      Telefones
                    </h3>
                    <p className="text-gray-700">
                      <strong>Atendimento:</strong> (35) 99823-9302
                      <br />
                      <strong>Emergências Jurídicas 24h:</strong> (35)
                      99881-8700
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#b96d00] text-white rounded-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#605f60] mb-2">
                      E-mail
                    </h3>
                    <p className="text-gray-700">
                      renanmarquesadvocacia@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#b96d00] text-white rounded-lg">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#605f60] mb-2">
                      Horário de Atendimento
                    </h3>
                    <p className="text-gray-700">
                      Segunda a sexta-feira
                      <br />
                      Das 9h às 17h
                    </p>
                  </div>
                </div>
              </div>

              {/* Localização */}
              <div className="mt-8">
                <h3 className="font-semibold text-[#605f60] mb-4">
                  Localização
                </h3>
                <div className="bg-[#dedcd7] p-6 rounded-lg">
                  {" "}
                  <Mapa></Mapa>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#dedcd7] p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-[#605f60] mb-6">
                Envie uma Mensagem
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-[#605f60] mb-2"
                    >
                      Nome completo *
                    </label>
                    <Input
                      id="nome"
                      placeholder="Seu nome completo"
                      className="bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#605f60] mb-2"
                    >
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      placeholder="seu@email.com"
                      type="email"
                      className="bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium text-[#605f60] mb-2"
                  >
                    Telefone
                  </label>
                  <Input
                    id="telefone"
                    placeholder="(35) 99999-9999"
                    className="bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="assunto"
                    className="block text-sm font-medium text-[#605f60] mb-2"
                  >
                    Assunto *
                  </label>
                  <Input
                    id="assunto"
                    placeholder="Assunto da sua mensagem"
                    className="bg-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-sm font-medium text-[#605f60] mb-2"
                  >
                    Mensagem *
                  </label>
                  <Textarea
                    id="mensagem"
                    placeholder="Descreva sua necessidade ou dúvida..."
                    rows={6}
                    className="bg-white resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#b96d00] hover:bg-[#b06f09] text-white py-3"
                >
                  Enviar Mensagem
                </Button>

                <p className="text-sm text-gray-600 mt-4">
                  * Campos obrigatórios
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
