import { z } from "zod";

const CharFormSchema = z.object({
    nome: z.string().min(2),
    nivel: z.number().min(1).max(20),
});

export default CharFormSchema;