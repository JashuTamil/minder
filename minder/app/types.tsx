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
    title: z.string(),
    overview: z.string(),
    vote_average: z.float32(),
    runtime: z.number(),
    poster_path: z.string(),
    cast: z.string(),
    director: z.string(),
    year: z.number()
})

export const FeedbackSchema = {
    likes: z.array(MovieSchema),
    dislikes: z.array(MovieSchema)
}

export type MovieType = z.infer<typeof MovieSchema>
export type FeedbackType = z.infer<typeof FeedbackSchema>