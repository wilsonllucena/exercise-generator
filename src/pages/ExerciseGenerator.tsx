
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ExerciseForm, FormData } from "@/components/exercise-generator/ExerciseForm";
import { ExercisePreview } from "@/components/exercise-generator/ExercisePreview";
import { generateExercise } from "@/utils/exerciseGenerator";

const ExerciseGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedExercise, setGeneratedExercise] = useState<string>("");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Simulando chamada à API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const exercise = generateExercise(data);
      setGeneratedExercise(exercise);
      
      toast({
        title: "Exercícios gerados com sucesso!",
        description: "Seus exercícios estão prontos.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar exercícios",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-semibold mb-6">Gerador de Exercícios</h1>
            <ExerciseForm onSubmit={onSubmit} isLoading={isLoading} />
          </div>

          <ExercisePreview exercise={generatedExercise} />
        </div>
      </div>
    </div>
  );
};

export default ExerciseGenerator;
