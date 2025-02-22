
import { FormData } from "@/components/exercise-generator/ExerciseForm";

export const generateExercise = (data: FormData): string => {
  return `# Lista de Exercícios - ${data.subject}

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
};
