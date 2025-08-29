
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/contexts/DataContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import WebApplications from "./pages/WebApplications";
import WebsiteCreation from "./pages/WebsiteCreation";
import WebGames from "./pages/WebGames";
import SoftwareDevelopment from "./pages/SoftwareDevelopment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/web-applications" element={<WebApplications />} />
              <Route path="/website-creation" element={<WebsiteCreation />} />
              <Route path="/web-games" element={<WebGames />} />
              <Route path="/software-development" element={<SoftwareDevelopment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;
