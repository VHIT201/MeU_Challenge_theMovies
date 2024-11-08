import { z } from 'zod';

export const schemaForm = z.object({
    username: z.string().min(8, { message: 'Username least 8 character' }),
    overview: z.string(),
});
