
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, LogOut } from "lucide-react";

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">Sistema de Exercícios</h1>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/exercise-generator">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center space-x-4">
                <BookOpen className="h-8 w-8 text-[#86A789]" />
                <CardTitle>Gerar Exercícios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Crie exercícios personalizados para suas aulas usando IA
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Placeholder para futuras funcionalidades */}
          <Card className="opacity-50">
            <CardHeader>
              <CardTitle>Em breve</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Novas funcionalidades em desenvolvimento</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
