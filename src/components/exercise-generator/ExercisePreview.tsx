
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { FileText, Download, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

type ExercisePreviewProps = {
  exercise: string;
};

export const ExercisePreview = ({ exercise }: ExercisePreviewProps) => {
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Visualização</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("word")}
            disabled={!exercise}
          >
            <FileText className="h-4 w-4 mr-2" />
            WORD
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("pdf")}
            disabled={!exercise}
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            disabled={!exercise}
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="prose prose-sm max-w-none dark:prose-invert">
        {exercise ? (
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
              {exercise}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            Os exercícios gerados aparecerão aqui
          </div>
        )}
      </div>
    </div>
  );
};
