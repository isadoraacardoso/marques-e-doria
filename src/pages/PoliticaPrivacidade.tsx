const PoliticaPrivacidade = () => {
  return <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#dedcd7] via-[#d2cdc6] to-[#dedcd7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#605f60] mb-6">
            Política de Privacidade
          </h1>
          <div className="w-24 h-1 bg-[#b96d00] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Transparência e proteção de dados em conformidade com a LGPD
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">
            <div className="bg-[#dedcd7] p-8 rounded-lg mb-8">
              <p className="text-lg leading-relaxed text-center">
                O <strong>Marques & Doria Sociedade de Advogados</strong> preza pela privacidade e pela 
                proteção dos dados de seus clientes e visitantes. Todos os dados eventualmente 
                coletados por meio deste site são tratados em conformidade com a Lei Geral de 
                Proteção de Dados Pessoais (LGPD), com a finalidade exclusiva de atendimento às 
                solicitações realizadas.
              </p>
            </div>

            
          </div>
        </div>
      </section>
    </div>;
};
export default PoliticaPrivacidade;