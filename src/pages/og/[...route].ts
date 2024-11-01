import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const blogPosts = await getCollection('blog');

const pages = Object.fromEntries(
  blogPosts.map(({ id, slug, data }) => [id, { data, slug }])
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: async (_, { data, slug }: (typeof pages)[string]) => ({
    title: data.title,
    description: data.excerpt,
    /* bgImage: {
      path: `public/images/${path.basename(data.cover.src.split('?')[0])}`,
      fit: 'cover',
    }, */
    bgGradient: [[150, 223 , 169]],
    padding: 80,
    font: {
      title: {
        size: 50,
        weight: 'ExtraBold',
        families: ["Inter", "Helvetica Neue", 'sans-serif'],
        color: [13, 18, 14],
      },
      description: {
        size: 30,
        weight: 'Normal',
        families: ["Inter", "Helvetica Neue", 'sans-serif'],
        color: [13, 18, 14],
      },
    },
  }),
});
