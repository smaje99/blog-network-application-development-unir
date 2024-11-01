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
  }),
});
