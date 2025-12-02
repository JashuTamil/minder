import { z } from 'zod'

export type idxProp = {
    name: string;
    position: number;
}

export type feedbackProp = {
    likes: Array<string>;
    dislikes: Array<string>;
}

export const MovieSchema = z.object({
    id: z.number(),
    name: z.string(),
    director: z.string(),
    cast: z.array(z.string()),
    year: z.number(),
    description: z.string(),
    url: z.string(),
    runtime: z.number(),
    rating: z.float32()
})

export const FeedbackSchema = {
    likes: z.array(MovieSchema),
    dislikes: z.array(MovieSchema)
}

export type MovieType = z.infer<typeof MovieSchema>
export type FeedbackType = z.infer<typeof FeedbackSchema>