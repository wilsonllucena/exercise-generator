
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileText, Download, Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  subject: z.string().min(1, "Selecione uma matéria"),
  questionCount: z.string().min(1, "Selecione a quantidade de questões"),
  grade: z.string().min(1, "Selecione a série"),
  questionType: z.string().min(1, "Selecione o tipo de questão"),
  additionalInfo: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const ExerciseGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedExercise, setGeneratedExercise] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      questionCount: "",
      grade: "",
      questionType: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Simulando chamada à API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Exemplo de exercício gerado em markdown com formatação mais rica
      const mockExercise = `# Lista de Exercícios - ${data.subject}

## ${data.grade}º Ano - ${data.questionType === "multiple" ? "Múltipla Escolha" : data.questionType === "written" ? "Dissertativa" : "Mista"}

### Instruções
- Leia atentamente cada questão antes de responder
- Utilize caneta azul ou preta
- Não é permitido o uso de calculadora

---

1. **Qual é a capital do Brasil?**
   
   - [ ] a) São Paulo
   - [ ] b) Rio de Janeiro
   - [x] c) Brasília
   - [ ] d) Salvador

   > **Dica:** É uma cidade planejada, inaugurada em 1960.

2. **Quanto é 2 + 2?**
   
   - [ ] a) 3
   - [x] b) 4
   - [ ] c) 5
   - [ ] d) 6

   > **Explicação:** Esta é uma operação básica de adição.

3. **Complete a frase: "O sol é uma..."**
   
   - [ ] a) Planeta
   - [x] b) Estrela
   - [ ] c) Cometa
   - [ ] d) Satélite

   > **Importante:** O Sol é a estrela central do nosso sistema solar.

4. **Resolva: 10 × 5 = ?**
   
   - [ ] a) 40
   - [x] b) 50
   - [ ] c) 60
   - [ ] d) 70

   > **Método:** Multiplicação básica.

5. **Qual é o maior planeta do sistema solar?**
   
   - [ ] a) Terra
   - [ ] b) Marte
   - [x] c) Júpiter
   - [ ] d) Saturno

   > **Fato:** Júpiter é 2,5 vezes mais massivo que todos os outros planetas juntos.

---

**Boa sorte!**`;

      setGeneratedExercise(mockExercise);
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

  const handleExport = (format: "word" | "pdf") => {
    toast({
      title: `Exportando para ${format.toUpperCase()}`,
      description: "O download começará em instantes.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Compartilhar exercícios",
      description: "Função de compartilhamento em desenvolvimento.",
    });
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
          {/* Formulário */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-semibold mb-6">Gerador de Exercícios</h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matéria</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a matéria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="matematica">Matemática</SelectItem>
                          <SelectItem value="portugues">Português</SelectItem>
                          <SelectItem value="ciencias">Ciências</SelectItem>
                          <SelectItem value="historia">História</SelectItem>
                          <SelectItem value="geografia">Geografia</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="questionCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade de Questões</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a quantidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="5">5 questões</SelectItem>
                          <SelectItem value="10">10 questões</SelectItem>
                          <SelectItem value="15">15 questões</SelectItem>
                          <SelectItem value="20">20 questões</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Série</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a série" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="6">6º ano</SelectItem>
                          <SelectItem value="7">7º ano</SelectItem>
                          <SelectItem value="8">8º ano</SelectItem>
                          <SelectItem value="9">9º ano</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="questionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Questões</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="multiple">Múltipla Escolha</SelectItem>
                          <SelectItem value="written">Dissertativa</SelectItem>
                          <SelectItem value="mixed">Mista</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Informações Adicionais</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Digite informações adicionais sobre o conteúdo..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#86A789] hover:bg-[#86A789]/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Gerando exercícios..." : "Gerar Exercícios"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Visualização do Exercício */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Visualização</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("word")}
                  disabled={!generatedExercise}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  WORD
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("pdf")}
                  disabled={!generatedExercise}
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  disabled={!generatedExercise}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="prose prose-sm max-w-none dark:prose-invert">
              {generatedExercise ? (
                <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[calc(100vh-300px)]">
                  <ReactMarkdown
                    components={{
                      h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                      h2: ({ ...props }) => <h2 className="text-xl font-semibold mb-3" {...props} />,
                      h3: ({ ...props }) => <h3 className="text-lg font-medium mb-2" {...props} />,
                      p: ({ ...props }) => <p className="mb-4" {...props} />,
                      ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
                      ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                      li: ({ ...props }) => <li className="mb-1" {...props} />,
                      blockquote: ({ ...props }) => (
                        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />
                      ),
                      hr: () => <hr className="my-6 border-t border-gray-200" />,
                    }}
                  >
                    {generatedExercise}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  Os exercícios gerados aparecerão aqui
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseGenerator;
