export const About = () => {
  return <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#605f60] mb-6">
            Nosso Propósito
          </h2>
          <div className="w-24 h-1 bg-[#b96d00] mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">Desde 2020, somos um escritório jovem, moderno e comprometido com uma advocacia ética, responsável e atualizada.


Atuamos com excelência na defesa dos interesses de nossos clientes, sempre buscando soluções jurídicas eficazes e alinhadas com as constantes transformações do mundo jurídico e social.</p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nosso propósito é oferecer um atendimento próximo e humanizado, 
              valorizando a clareza na comunicação e a confiança nas relações profissionais.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#dedcd7] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#605f60] mb-3">Missão</h3>
              <p className="text-gray-700">
                Atuar com excelência, ética e responsabilidade na defesa dos interesses 
                de nossos clientes.
              </p>
            </div>
            <div className="bg-[#d2cdc6] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#605f60] mb-3">Visão</h3>
              <p className="text-gray-700">
                Ser referência regional pela qualidade técnica e pela confiança 
                que transmitimos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};