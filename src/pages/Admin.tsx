import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Upload, Image, Video, Youtube, LogOut, Key } from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import { useFileUpload } from "@/hooks/useFileUpload";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { useCarouselImages } from "@/hooks/useCarouselImages";
import { useTeamMemberPhotos } from "@/hooks/useTeamMemberPhotos";
import { useToast } from "@/hooks/use-toast";
import { useTeamPhoto } from "@/hooks/useTeamPhoto";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminPasswordChange } from "@/components/AdminPasswordChange";

const Admin = () => {
  const { isAuthenticated, loading: authLoading, login, logout, changePassword } = useAdminAuth();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [activeTab, setActiveTab] = useState("noticias");
  const {
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember
  } = useTeamMembers();
  const {
    articles,
    addArticle,
    updateArticle,
    deleteArticle
  } = useNewsArticles();
  const {
    practiceAreas,
    addPracticeArea,
    deletePracticeArea
  } = usePracticeAreas();
  const {
    carouselImages,
    addCarouselImage,
    deleteCarouselImage
  } = useCarouselImages();
  const {
    uploadFile,
    uploading
  } = useFileUpload();
  const {
    toast
  } = useToast();

  // Form states
  const [newsForm, setNewsForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    author: '',
    image_url: '',
    video_url: '',
    youtube_url: ''
  });
  const [teamForm, setTeamForm] = useState({
    name: '',
    position: '',
    oab_registration: '',
    biography: '',
    areas: '',
    photo_url: '',
    display_order: 0
  });
  const [practiceAreaForm, setPracticeAreaForm] = useState({
    title: '',
    description: '',
    icon_name: '',
    display_order: 0
  });
  const [carouselForm, setCarouselForm] = useState({
    image_url: '',
    alt_text: '',
    display_order: 0,
    is_active: true
  });
  const [selectedMemberForPhotos, setSelectedMemberForPhotos] = useState<string | null>(null);
  const {
    photos: memberPhotos,
    addPhoto,
    deletePhoto
  } = useTeamMemberPhotos(selectedMemberForPhotos || undefined);

  // Add team photo hook
  const {
    teamPhoto,
    updateTeamPhoto,
    deleteTeamPhoto
  } = useTeamPhoto();
  const [teamPhotoForm, setTeamPhotoForm] = useState({
    photo_url: '',
    alt_text: ''
  });

  const handleImageUpload = async (file: File, type: 'news' | 'team' | 'carousel' | 'team-photo' | 'team-main') => {
    try {
      const bucketMap = {
        'news': 'news-images',
        'team': 'team-photos',
        'carousel': 'carousel-images',
        'team-photo': 'team-photos',
        'team-main': 'team-photos'
      };
      const bucket = bucketMap[type];
      const url = await uploadFile(file, bucket);
      if (type === 'news') {
        setNewsForm(prev => ({
          ...prev,
          image_url: url
        }));
      } else if (type === 'team') {
        setTeamForm(prev => ({
          ...prev,
          photo_url: url
        }));
      } else if (type === 'carousel') {
        setCarouselForm(prev => ({
          ...prev,
          image_url: url
        }));
      } else if (type === 'team-photo' && selectedMemberForPhotos) {
        await addPhoto({
          team_member_id: selectedMemberForPhotos,
          photo_url: url,
          alt_text: '',
          display_order: memberPhotos.length
        });
      } else if (type === 'team-main') {
        setTeamPhotoForm(prev => ({
          ...prev,
          photo_url: url
        }));
      }
      toast({
        title: "Upload realizado com sucesso",
        description: "A imagem foi enviada com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar a imagem.",
        variant: "destructive"
      });
    }
  };
  const handleVideoUpload = async (file: File) => {
    try {
      const url = await uploadFile(file, 'news-videos');
      setNewsForm(prev => ({
        ...prev,
        video_url: url
      }));
      toast({
        title: "Upload realizado com sucesso",
        description: "O vídeo foi enviado com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar o vídeo.",
        variant: "destructive"
      });
    }
  };
  const handleNewsSubmit = async () => {
    try {
      await addArticle({
        ...newsForm,
        published_at: new Date().toISOString()
      });
      setNewsForm({
        title: '',
        summary: '',
        content: '',
        category: '',
        author: '',
        image_url: '',
        video_url: '',
        youtube_url: ''
      });
      toast({
        title: "Notícia salva",
        description: "A notícia foi salva com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a notícia.",
        variant: "destructive"
      });
    }
  };
  const handleTeamSubmit = async () => {
    try {
      await addTeamMember(teamForm);
      setTeamForm({
        name: '',
        position: '',
        oab_registration: '',
        biography: '',
        areas: '',
        photo_url: '',
        display_order: 0
      });
      toast({
        title: "Membro adicionado",
        description: "O membro da equipe foi adicionado com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível adicionar o membro da equipe.",
        variant: "destructive"
      });
    }
  };
  const handlePracticeAreaSubmit = async () => {
    try {
      await addPracticeArea(practiceAreaForm);
      setPracticeAreaForm({
        title: '',
        description: '',
        icon_name: '',
        display_order: 0
      });
      toast({
        title: "Área de atuação adicionada",
        description: "A área de atuação foi adicionada com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível adicionar a área de atuação.",
        variant: "destructive"
      });
    }
  };
  const handleCarouselSubmit = async () => {
    try {
      await addCarouselImage(carouselForm);
      setCarouselForm({
        image_url: '',
        alt_text: '',
        display_order: 0,
        is_active: true
      });
      toast({
        title: "Imagem do carrossel adicionada",
        description: "A imagem foi adicionada ao carrossel com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível adicionar a imagem ao carrossel.",
        variant: "destructive"
      });
    }
  };
  const handleTeamPhotoSubmit = async () => {
    try {
      await updateTeamPhoto(teamPhotoForm);
      setTeamPhotoForm({
        photo_url: '',
        alt_text: ''
      });
      toast({
        title: "Foto da equipe atualizada",
        description: "A foto da equipe foi atualizada com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível atualizar a foto da equipe.",
        variant: "destructive"
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b96d00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/uploads/16039e76-a2ca-4ca2-a871-3e4a3bedaee4.png" alt="Marques & Doria" className="h-8 w-auto" />
            <span className="text-lg font-semibold text-[#605f60]">
              Painel Administrativo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordChange(true)}
            >
              <Key className="w-4 h-4 mr-2" />
              Alterar Senha
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#605f60] mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600">
            Gerencie o conteúdo do site Marques & Doria
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white">
            <TabsTrigger value="noticias">Notícias</TabsTrigger>
            <TabsTrigger value="equipe">Equipe</TabsTrigger>
            <TabsTrigger value="fotos-equipe">Fotos Equipe</TabsTrigger>
            <TabsTrigger value="foto-principal">Foto Principal</TabsTrigger>
            <TabsTrigger value="carousel">Carrossel</TabsTrigger>
            <TabsTrigger value="areas">Áreas de Atuação</TabsTrigger>
          </TabsList>

          {/* News Management */}
          <TabsContent value="noticias" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gerenciar Notícias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="titulo">Título</Label>
                      <Input
                        id="titulo"
                        placeholder="Título da notícia"
                        value={newsForm.title}
                        onChange={e => setNewsForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoria">Categoria</Label>
                      <Input
                        id="categoria"
                        placeholder="Ex: Direito Civil"
                        value={newsForm.category}
                        onChange={e => setNewsForm(prev => ({ ...prev, category: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="autor">Autor</Label>
                    <Input
                      id="autor"
                      placeholder="Nome do autor"
                      value={newsForm.author}
                      onChange={e => setNewsForm(prev => ({ ...prev, author: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="resumo">Resumo</Label>
                    <Textarea
                      id="resumo"
                      placeholder="Resumo da notícia"
                      rows={3}
                      value={newsForm.summary}
                      onChange={e => setNewsForm(prev => ({ ...prev, summary: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="conteudo">Conteúdo</Label>
                    <Textarea
                      id="conteudo"
                      placeholder="Conteúdo completo da notícia"
                      rows={8}
                      value={newsForm.content}
                      onChange={e => setNewsForm(prev => ({ ...prev, content: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Imagem da Notícia</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, 'news');
                          }}
                          disabled={uploading}
                        />
                        <Image size={20} className="text-gray-500" />
                      </div>
                      {newsForm.image_url && (
                        <img src={newsForm.image_url} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
                      )}
                    </div>
                    
                    <div>
                      <Label>Vídeo da Notícia (Opcional)</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handleVideoUpload(file);
                          }}
                          disabled={uploading}
                        />
                        <Video size={20} className="text-gray-500" />
                      </div>
                      {newsForm.video_url && (
                        <video src={newsForm.video_url} className="mt-2 w-32 h-32 object-cover rounded" controls />
                      )}
                    </div>

                    <div>
                      <Label htmlFor="youtube-url">URL do YouTube (Opcional)</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          id="youtube-url"
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={newsForm.youtube_url}
                          onChange={e => setNewsForm(prev => ({ ...prev, youtube_url: e.target.value }))}
                        />
                        <Youtube size={20} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleNewsSubmit}
                      disabled={uploading}
                      className="bg-[#b96d00] hover:bg-[#b06f09]"
                    >
                      {uploading ? "Enviando..." : "Salvar"}
                    </Button>
                    <Button variant="outline">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* News List */}
            <Card>
              <CardHeader>
                <CardTitle>Notícias Publicadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.map(article => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <p className="text-sm text-gray-600">{article.category} - {article.author}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteArticle(article.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Management */}
          <TabsContent value="equipe" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gerenciar Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        placeholder="Nome completo"
                        value={teamForm.name}
                        onChange={e => setTeamForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cargo">Cargo</Label>
                      <Input
                        id="cargo"
                        placeholder="Ex: Advogado, Estagiário"
                        value={teamForm.position}
                        onChange={e => setTeamForm(prev => ({ ...prev, position: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="oab">OAB/Formação</Label>
                    <Input
                      id="oab"
                      placeholder="Ex: OAB/MG nº 123.456"
                      value={teamForm.oab_registration}
                      onChange={e => setTeamForm(prev => ({ ...prev, oab_registration: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="biografia">Biografia</Label>
                    <Textarea
                      id="biografia"
                      placeholder="Biografia do membro"
                      rows={5}
                      value={teamForm.biography}
                      onChange={e => setTeamForm(prev => ({ ...prev, biography: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="areas">Áreas de Atuação</Label>
                    <Input
                      id="areas"
                      placeholder="Ex: Direito Civil, Direito Penal"
                      value={teamForm.areas}
                      onChange={e => setTeamForm(prev => ({ ...prev, areas: e.target.value }))}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleTeamSubmit}
                      disabled={uploading}
                      className="bg-[#b96d00] hover:bg-[#b06f09]"
                    >
                      {uploading ? "Enviando..." : "Salvar"}
                    </Button>
                    <Button variant="outline">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team List */}
            <Card>
              <CardHeader>
                <CardTitle>Membros da Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {member.photo_url && (
                          <img src={member.photo_url} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                        )}
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.position}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteTeamMember(member.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Team Photos Management Tab */}
          <TabsContent value="fotos-equipe" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Fotos dos Membros da Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Selecionar Membro da Equipe</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={selectedMemberForPhotos || ''}
                      onChange={e => setSelectedMemberForPhotos(e.target.value || null)}
                    >
                      <option value="">Selecione um membro</option>
                      {teamMembers.map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedMemberForPhotos && (
                    <div>
                      <Label>Adicionar Nova Foto</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, 'team-photo');
                          }}
                          disabled={uploading}
                        />
                        <Image size={20} className="text-gray-500" />
                      </div>
                    </div>
                  )}

                  {selectedMemberForPhotos && (
                    <div>
                      <h3 className="font-semibold mb-4">Fotos Atuais</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {memberPhotos.map(photo => (
                          <div key={photo.id} className="relative">
                            <img
                              src={photo.photo_url}
                              alt={photo.alt_text || "Foto do membro"}
                              className="w-full h-32 object-cover rounded"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute top-1 right-1"
                              onClick={() => deletePhoto(photo.id)}
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Team Main Photo Management Tab */}
          <TabsContent value="foto-principal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Foto Principal da Equipe</CardTitle>
                <p className="text-sm text-gray-600">
                  Esta foto aparece na página "Quem Somos" representando toda a equipe.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPhoto && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Foto Atual</h3>
                      <div className="relative inline-block">
                        <img
                          src={teamPhoto.photo_url}
                          alt={teamPhoto.alt_text || "Equipe Marques & Doria"}
                          className="w-64 h-40 object-cover rounded-lg shadow-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => deleteTeamPhoto()}
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Nova Foto da Equipe</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'team-main');
                        }}
                        disabled={uploading}
                      />
                      <Image size={20} className="text-gray-500" />
                    </div>
                    {teamPhotoForm.photo_url && (
                      <img src={teamPhotoForm.photo_url} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded" />
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="team-photo-alt">Texto Alternativo</Label>
                    <Input
                      id="team-photo-alt"
                      placeholder="Ex: Equipe Marques & Doria Sociedade de Advogados"
                      value={teamPhotoForm.alt_text}
                      onChange={e => setTeamPhotoForm(prev => ({ ...prev, alt_text: e.target.value }))}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleTeamPhotoSubmit}
                      disabled={uploading || !teamPhotoForm.photo_url}
                      className="bg-[#b96d00] hover:bg-[#b06f09]"
                    >
                      {uploading ? "Enviando..." : "Salvar Foto da Equipe"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setTeamPhotoForm({ photo_url: '', alt_text: '' })}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carousel Management */}
          <TabsContent value="carousel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Carrossel da Página Inicial</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Imagem do Carrossel</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'carousel');
                        }}
                        disabled={uploading}
                      />
                      <Image size={20} className="text-gray-500" />
                    </div>
                    {carouselForm.image_url && (
                      <img src={carouselForm.image_url} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="alt-text">Texto Alternativo</Label>
                    <Input
                      id="alt-text"
                      placeholder="Descrição da imagem"
                      value={carouselForm.alt_text}
                      onChange={e => setCarouselForm(prev => ({ ...prev, alt_text: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="display-order">Ordem de Exibição</Label>
                    <Input
                      id="display-order"
                      type="number"
                      placeholder="0"
                      value={carouselForm.display_order}
                      onChange={e => setCarouselForm(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCarouselSubmit}
                      disabled={uploading || !carouselForm.image_url}
                      className="bg-[#b96d00] hover:bg-[#b06f09]"
                    >
                      {uploading ? "Enviando..." : "Adicionar ao Carrossel"}
                    </Button>
                    <Button variant="outline">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carousel Images List */}
            <Card>
              <CardHeader>
                <CardTitle>Imagens do Carrossel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {carouselImages.map(image => (
                    <div key={image.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img src={image.image_url} alt={image.alt_text || "Carrossel"} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <p className="font-medium">{image.alt_text || "Sem descrição"}</p>
                          <p className="text-sm text-gray-600">Ordem: {image.display_order}</p>
                          <p className="text-sm text-gray-600">{image.is_active ? "Ativo" : "Inativo"}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteCarouselImage(image.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Areas Management */}
          <TabsContent value="areas" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gerenciar Áreas de Atuação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="area-titulo">Título da Área</Label>
                    <Input
                      id="area-titulo"
                      placeholder="Ex: Direito Civil"
                      value={practiceAreaForm.title}
                      onChange={e => setPracticeAreaForm(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="area-descricao">Descrição</Label>
                    <Textarea
                      id="area-descricao"
                      placeholder="Descrição da área de atuação"
                      rows={4}
                      value={practiceAreaForm.description}
                      onChange={e => setPracticeAreaForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon-name">Nome do Ícone (Lucide)</Label>
                    <Input
                      id="icon-name"
                      placeholder="Ex: Scale, FileText, Users"
                      value={practiceAreaForm.icon_name}
                      onChange={e => setPracticeAreaForm(prev => ({ ...prev, icon_name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="area-order">Ordem de Exibição</Label>
                    <Input
                      id="area-order"
                      type="number"
                      placeholder="0"
                      value={practiceAreaForm.display_order}
                      onChange={e => setPracticeAreaForm(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handlePracticeAreaSubmit}
                      disabled={!practiceAreaForm.title || !practiceAreaForm.description}
                      className="bg-[#b96d00] hover:bg-[#b06f09]"
                    >
                      Salvar
                    </Button>
                    <Button variant="outline">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practice Areas List */}
            <Card>
              <CardHeader>
                <CardTitle>Áreas de Atuação Cadastradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {practiceAreas.map(area => (
                    <div key={area.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{area.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{area.description}</p>
                        <div className="text-xs text-gray-500">
                          <p>Ícone: {area.icon_name || 'Nenhum'}</p>
                          <p>Ordem: {area.display_order}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePracticeArea(area.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Password Change Modal */}
      {showPasswordChange && (
        <AdminPasswordChange
          onChangePassword={changePassword}
          onClose={() => setShowPasswordChange(false)}
        />
      )}
    </div>;
};

export default Admin;
