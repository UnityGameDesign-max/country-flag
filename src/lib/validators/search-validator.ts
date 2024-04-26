import { z } from 'zod';

export const SearchCountryValidator = z.object({
    search: z.string().trim().min(1, { message: "search country field is required." })
})

export type TSearchCountryValidator = z.infer<typeof SearchCountryValidator>