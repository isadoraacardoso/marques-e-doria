import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
interface AdminLoginProps {
  onLogin: (username: string, password: string) => boolean;
}
export const AdminLogin = ({
  onLogin
}: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = onLogin(username, password);
      if (!success) {
        toast({
          title: "Erro de autenticação",
          description: "Usuário ou senha incorretos.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src="/uploads/16039e76-a2ca-4ca2-a871-3e4a3bedaee4.png" alt="Marques & Doria" className="h-16 w-auto mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-[#605f60]">
            Painel Administrativo
          </CardTitle>
          <p className="text-gray-600">
            Entre com suas credenciais de administrador
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Usuário</Label>
              <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Digite seu usuário" required />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" required />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-[#b96d00] hover:bg-[#b06f09]" disabled={loading}>
              {loading ? "Entrando..." : <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </>}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
          </p>
          </div>
        </CardContent>
      </Card>
    </div>;
};