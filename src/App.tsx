
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminAuth } from "@/components/AdminAuth";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import AreasAtuacao from "./pages/AreasAtuacao";
import Noticias from "./pages/Noticias";
import NoticiaDetalhes from "./pages/NoticiaDetalhes";
import Contato from "./pages/Contato";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col w-full">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={
              <>
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/quem-somos" element={<QuemSomos />} />
                    <Route path="/areas-atuacao" element={<AreasAtuacao />} />
                    <Route path="/noticias" element={<Noticias />} />
                    <Route path="/noticias/:id" element={<NoticiaDetalhes />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
