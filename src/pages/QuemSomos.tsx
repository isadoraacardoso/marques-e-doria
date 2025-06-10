import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useTeamMemberPhotos } from "@/hooks/useTeamMemberPhotos";
import { useTeamPhoto } from "@/hooks/useTeamPhoto";
import { TeamMemberPhotoCarousel } from "@/components/TeamMemberPhotoCarousel";
const QuemSomos = () => {
  const {
    teamMembers,
    loading
  } = useTeamMembers();
  const {
    teamPhoto
  } = useTeamPhoto();
  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#b96d00] mx-auto mb-4"></div>
          <p className="text-[#605f60]">Carregando...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#dedcd7] via-[#d2cdc6] to-[#dedcd7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#605f60] mb-6">
            Quem Somos
          </h1>
          <div className="w-24 h-1 bg-[#b96d00] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            O escritório Marques & Doria Sociedade de Advogados foi fundado com o propósito 
            de oferecer um atendimento jurídico pautado na ética, no comprometimento e na busca 
            constante por soluções eficazes e atualizadas.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#605f60] mb-6">
              Nossa Equipe
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              Nossa equipe é composta por profissionais capacitados, sempre atualizados 
              e comprometidos com a defesa dos interesses de nossos clientes.
            </p>
            
            {/* Team Photo Section */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  {teamPhoto ? <>
                      <img src={teamPhoto.photo_url} alt={teamPhoto.alt_text || "Equipe Marques & Doria"} className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg" />
                      <p className="text-sm text-gray-600 mt-4">
                        {teamPhoto.alt_text || "Equipe Marques & Doria Sociedade de Advogados"}
                      </p>
                    </> : <>
                      <img alt="Equipe Marques & Doria" className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg" src="/uploads/fa1704de-463f-4898-8dca-062597450af2.jpg" />
                      <p className="text-sm text-gray-600 mt-4">
                        Equipe Marques & Doria Sociedade de Advogados
                      </p>
                    </>}
                </div>
              </div>
            </div>
          </div>

          {teamMembers.length === 0 ? <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">
                Nenhum membro da equipe cadastrado ainda.
              </p>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map(member => <TeamMemberCard key={member.id} member={member} />)}
            </div>}
        </div>
      </section>

      {/* Values Section */}
      
    </div>;
};
const TeamMemberCard = ({
  member
}: {
  member: any;
}) => {
  const {
    photos
  } = useTeamMemberPhotos(member.id);
  return <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <TeamMemberPhotoCarousel photos={photos} memberName={member.name} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#605f60] mb-2">
          {member.name}
        </h3>
        <p className="text-[#b96d00] font-medium mb-2">
          {member.position}
        </p>
        {member.oab_registration && <p className="text-gray-600 text-sm mb-3">
            {member.oab_registration}
          </p>}
        {member.biography && <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {member.biography}
          </p>}
        {member.areas && <div>
            <h4 className="font-semibold text-[#605f60] mb-2">Áreas de Atuação:</h4>
            <p className="text-gray-700 text-sm">
              {member.areas}
            </p>
          </div>}
      </div>
    </div>;
};
export default QuemSomos;