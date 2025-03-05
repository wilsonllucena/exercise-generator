
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { FileText, Download, Send, Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import jsPDF from "jspdf";
type ExercisePreviewProps = {
  exercise: string;
};

function convertMarkdownToPDF(markdown: string) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const lineHeight = 7;
  const maxWidth = pageWidth - (2 * margin);
  
  let y = margin;
  const lines = markdown.split('\n');
  
  lines.forEach(line => {
    // Handle headers
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s/, '');
      const fontSize = 16 - (level * 2); // Decrease size for each header level
      pdf.setFontSize(fontSize);
      pdf.text(text, margin, y);
      y += lineHeight + 2;
    }
    // Handle lists
    else if (line.match(/^[-*]\s/)) {
      const text = line.replace(/^[-*]\s/, '• ');
      pdf.setFontSize(12);
      pdf.text(text, margin + 5, y);
      y += lineHeight;
    }
    // Handle normal text
    else if (line.trim()) {
      pdf.setFontSize(12);
      const splitText = pdf.splitTextToSize(line, maxWidth);
      splitText.forEach(textLine => {
        pdf.text(textLine, margin, y);
        y += lineHeight;
      });
    }
    // Handle empty lines
    else {
      y += lineHeight / 2;
    }
    
    // Add new page if needed
    if (y >= pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage();
      y = margin;
    }
  });

  pdf.save("exercicio.pdf");
}

function convertToWord(exercise: string) {
  const doc = new jsPDF();
  doc.text(exercise, 10, 10);
  doc.save("exercicio.docx");
}


function copyToClipboard(exercise: string) {
  const text = exercise
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/<[^>]*>/g, '');
  navigator.clipboard.writeText(text);
  toast({
    title: "Exercício copiado para a área de transferência",
  });
}


export const ExercisePreview = ({ exercise }: ExercisePreviewProps) => {
  const handleExport = (format: "word" | "pdf") => {
    if (format === "word") {
      convertToWord(exercise);
    } else if (format === "pdf") {
      convertMarkdownToPDF(exercise);
    }
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
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("word")}
            disabled={!exercise}
          >
            <FileText className="h-4 w-4 mr-2" />
            WORD
          </Button> */}
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
            onClick={() => copyToClipboard(exercise)}
            disabled={!exercise}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copiar
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
