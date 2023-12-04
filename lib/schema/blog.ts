import { z } from 'zod'

export const blogformSchema = z
  .object({
    title: z.string().min(2, {
      message: 'Le titre doit contenir au moins 2 caractères.',
    }),
    image_url: z.string().url({
      message: "L'url de l'image doit être une url valide.",
    }),
    content: z.string().min(2, {
      message: 'Le contenu doit contenir au moins 2 caractères.',
    }),
    is_published: z.boolean(),
    is_prenium: z.boolean(),
  })
  .refine(
    (data) => {
      // eslint-disable-next-line camelcase
      const { image_url } = data
      try {
        const url = new URL(image_url)
        return url.hostname === 'images.unsplash.com'
      } catch {
        return false
      }
    },
    {
      message: "Nous n'acceptons actuellement que les images d'Unsplash.",
      path: ['image_url'],
    },
  )

export type BlogFormSchemaType = z.infer<typeof blogformSchema>
