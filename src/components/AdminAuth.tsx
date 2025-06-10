
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

interface AdminAuthProps {
  children: React.ReactNode;
}

export const AdminAuth = ({ children }: AdminAuthProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Emails da empresa que têm acesso ao admin
  const COMPANY_EMAILS = [
    "renanmarquesadvocacia@gmail.com",
    "isadoraacardoso005@gmail.com"
  ];

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/admin'
        }
      });

      if (error) {
        toast({
          title: "Erro ao fazer login",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Erro ao sair",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao sair",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  // Verificar se o email é um dos emails autorizados da empresa
  const isAuthorizedUser = (user: User | null) => {
    if (!user?.email) return false;
    return COMPANY_EMAILS.includes(user.email);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b96d00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img 
              src="/uploads/16039e76-a2ca-4ca2-a871-3e4a3bedaee4.png" 
              alt="Marques & Doria"
              className="h-16 w-auto mx-auto mb-4"
            />
            <CardTitle className="text-2xl font-bold text-[#605f60]">
              Painel Administrativo
            </CardTitle>
            <p className="text-gray-600">
              Entre com sua conta Google autorizada
            </p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={signInWithGoogle}
              className="w-full bg-[#b96d00] hover:bg-[#b06f09] text-white"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar com Google
            </Button>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Apenas emails autorizados da empresa têm acesso
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthorizedUser(user)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">
              Acesso Negado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Apenas emails autorizados da empresa têm acesso a este painel.
            </p>
            <p className="text-sm text-gray-500">
              Email atual: {user.email}
            </p>
            <Button 
              onClick={signOut}
              variant="outline"
              className="w-full"
            >
              Sair e tentar com outra conta
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="/uploads/16039e76-a2ca-4ca2-a871-3e4a3bedaee4.png" 
              alt="Marques & Doria"
              className="h-8 w-auto"
            />
            <span className="text-sm text-gray-600">
              Logado como: {user.email}
            </span>
          </div>
          <Button 
            onClick={signOut}
            variant="outline"
            size="sm"
          >
            Sair
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};
